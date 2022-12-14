function nonExistingDataTable(target: string): Error {
  return new Error(`There is no DataTale! (for '${target}')`);
}

function invalidInput(target: string, type: string): Error {
  return new Error(`Invalid '${target}' has been inserted. (Must be ${type})`);
}

function invalidState(target: string, targetState: any, resolvingGuide: string): Error {
  return new Error(`'The ${target} state is ${targetState}. (${resolvingGuide})`);
}

const ErrorUtils = {
  nonExistingDataTable,
  invalidInput,
  invalidState,
};

export default ErrorUtils;
