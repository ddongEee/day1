package io.github.ddongeee.day1;

import com.zaxxer.hikari.HikariDataSource;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.jdbc.datasource.LazyConnectionDataSourceProxy;
import org.springframework.jdbc.datasource.lookup.AbstractRoutingDataSource;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.transaction.support.TransactionSynchronizationManager;

import javax.sql.DataSource;
import java.util.HashMap;
import java.util.Map;

@Configuration
@EnableTransactionManagement
public class DataSourceConfiguration {

    private static final String PRIMARY = "primary";
    private static final String SECONDARY = "secondary";

    @Value("${spring.datasource.url}")
    private String jdbcUrl;

    @Value("${spring.datasource-read-only.url}")
    private String readOnlyJdbcUrl;

    @Bean
    @ConfigurationProperties(prefix = "spring.datasource")
    public DataSource dataSource() {
        return DataSourceBuilder.create().url(jdbcUrl).type(HikariDataSource.class).build();
    }

    @Bean
    @ConfigurationProperties(prefix = "spring.datasource-read-only")
    public DataSource readOnlyDataSource() {
        return DataSourceBuilder.create().url(readOnlyJdbcUrl).type(HikariDataSource.class).build();
    }

    @Bean
    public DataSource routingDataSource(
            @Qualifier("dataSource") DataSource dataSource,
            @Qualifier("readOnlyDataSource") DataSource readOnlyDataSource) {
        AbstractRoutingDataSource routingDataSource =
                new AbstractRoutingDataSource() {
                    @Override
                    protected Object determineCurrentLookupKey() {
                        return TransactionSynchronizationManager.isCurrentTransactionReadOnly()
                                ? SECONDARY
                                : PRIMARY;
                    }
                };
        Map<Object, Object> dataSourceMap = new HashMap<>();
        dataSourceMap.put(SECONDARY, readOnlyDataSource);
        dataSourceMap.put(PRIMARY, dataSource);
        routingDataSource.setTargetDataSources(dataSourceMap);
        routingDataSource.setDefaultTargetDataSource(dataSource);
        return routingDataSource;
    }

    @Primary
    @Bean
    public DataSource lazyConnectionDataSource(
            @Qualifier("routingDataSource") DataSource routingDataSource) {
        return new LazyConnectionDataSourceProxy(routingDataSource);
    }
}
