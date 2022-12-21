#!/bin/bash
RECORDED_DATA="temp/mark-record.ejs"
TRIMMED_DATA="temp/trim-record.json"
STUB_FOLDER_DATA="temp/target-dir.json"
STUB_FOLDER_ROOT="temp/stub-record"
STUB_ROOT_FILE="${STUB_FOLDER_ROOT}/contracts.ejs"

echo ""
echo "[ Replace Stub ] Get folder data from marked recording"
echo ""
jq '.imposters[0].stubs' ${RECORDED_DATA} \
    | jp "[*].predicates[*]
              .not_null(deepEquals.path, deepEquals.method)
              | [*].join('',@)" \
    | jp "[*] | { directories: @ }" \
    > ${STUB_FOLDER_DATA} && jq "." ${STUB_FOLDER_DATA}

echo ""
echo "[ Replace Stub ] Create stub folders"
echo ""
jq ".directories" ${STUB_FOLDER_DATA} | jq -c '.[]' | tr -d '"' |
    while IFS=$"\n" read -r dir; do
        mkdir -p ${STUB_FOLDER_ROOT}/$dir
    done

# Check
# tree ${STUB_FOLDER_ROOT}

echo ""
echo "[ Replace Stub ] Remove response header datas"
cat ${RECORDED_DATA} | \
    jq 'del(.imposters[0].stubs[].responses[].is.headers)' \
    > "${TRIMMED_DATA}"

echo ""
echo "[ Replace Stub ] Get stub data from marked recording"
echo ""
INDEX=0
jq '.imposters[0].stubs' "${TRIMMED_DATA}" | jq -c '.[]' |
    while IFS=$"\n" read -r stub; do
        # echo $stub | jq 
        target_stub_dir=$(jq ".directories[${INDEX}]" ${STUB_FOLDER_DATA} | tr -d '"')
        target_stub_path="${STUB_FOLDER_ROOT}/${target_stub_dir}/contract.ejs"
        echo $stub | jq '.' > ${target_stub_path}
        # echo ">> target_stub_path: ${target_stub_path}"
        # cat ${target_stub_path}
        # echo ""
        let INDEX-=1
    done

# Check
tree ${STUB_FOLDER_ROOT}

echo ""
echo "[ Replace Stub ] Set stub gathering schema"
echo ""
cat<<EOF > ${STUB_ROOT_FILE}
{
  "name": "<%= process.env.MB_DAY1_IMPO_NAME %>",
  "protocol": "<%= process.env.MB_DASHBOARD_PRTL %>",
  "port": <%= process.env.MB_DAY1_IMPO_PORT %>,
  "recordRequests": false,
  "stubs": [
EOF

INDEX=0
PRE_FIX="<%- include("
POST_FIX=") %>"
INDENT="    "
jq '.imposters[0].stubs' "${TRIMMED_DATA}" | jq -c '.[]' |
    while IFS=$"\n" read -r stub; do
        target_stub_dir=$(jq ".directories[${INDEX}]" ${STUB_FOLDER_DATA} | tr -d '"')
        target_stub_path="./${target_stub_dir}/contract.ejs"
        target_stub_include="${PRE_FIX}\"${target_stub_path}\"${POST_FIX}"
        if [ ${INDEX} != 0 ]; then
          target_stub_include="${INDENT}, ${target_stub_include}"
        else
          target_stub_include="${INDENT}  ${target_stub_include}"
        fi
        echo "${target_stub_include}" >> ${STUB_ROOT_FILE}
        let INDEX-=1
    done

cat<<EOF >> ${STUB_ROOT_FILE}
  ]
}
EOF

# Check
cat ${STUB_ROOT_FILE}

echo ""
echo "[ Replace Stub ] Replace stub folder"
echo ""
[ -d "stub" ] && mv stub temp/baks/stub-$(date '+%y%m%d-%H%M%S')
mv ${STUB_FOLDER_ROOT} stub

tree stub