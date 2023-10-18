package learn.weather.data;

import learn.weather.data.mappers.WeatherCollectionMapper;
import learn.weather.data.mappers.WeatherForecastMapper;
import learn.weather.models.WeatherCollection;
import learn.weather.models.WeatherForecast;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;

@Repository
public class WeatherCollectionJdbcTemplateRepository implements WeatherCollectionRepository {

    private final JdbcTemplate jdbcTemplate;

    public WeatherCollectionJdbcTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<WeatherCollection> findByUserId(int userId) {

        //Need to add List<WeatherForecast> to the collections in this list

        final String sql = "select weather_collection_id, name, description, app_user_id "
                + "from weather_collection "
                + "where app_user_id = ?;";

        List<WeatherCollection> collections = jdbcTemplate.query(sql, new WeatherCollectionMapper(), userId);

        if(!collections.isEmpty()) {
            for (WeatherCollection collection : collections) {
                addForecasts(collection);
            }
        }

        return collections;
    }

    @Override
    public WeatherCollection findById(int collectionId) {

        final String sql = "select weather_collection_id, name, description, app_user_id "
                + "from weather_collection "
                + "where weather_collection_id = ?;";

        WeatherCollection collection = jdbcTemplate.query(sql, new WeatherCollectionMapper(), collectionId).stream()
                .findFirst().orElse(null);

        if(collection != null) {
            addForecasts(collection);
        }

        return collection;
    }

    @Override
    public WeatherCollection add(WeatherCollection collection) {

        final String sql = "insert into weather_collection (name, description, app_user_id) "
                + "values (?,?,?);";

        KeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, collection.getName());
            ps.setString(2, collection.getDescription() == null ? null : collection.getDescription());
            ps.setInt(3, collection.getUserId());
            return ps;
        }, keyHolder);

        if(rowsAffected <= 0) {
            return null;
        }

        collection.setWeatherCollectionId(keyHolder.getKey().intValue());
        return collection;
    }

    @Override
    public boolean update(WeatherCollection collection) {

        final String sql = "update weather_collection set "
                + "name = ?, "
                + "description = ? "
                + "where weather_collection_id = ?;";

        return jdbcTemplate.update(sql,
                collection.getName(),
                collection.getDescription(),
                collection.getWeatherCollectionId()) > 0;
    }

    @Override
    @Transactional
    public boolean deleteById(int collectionId) {
        jdbcTemplate.update("delete from weather_forecast where weather_collection_id = ?;", collectionId);
        return jdbcTemplate.update("delete from weather_collection where weather_collection_id = ?;", collectionId) > 0;
    }

    private void addForecasts(WeatherCollection collection) {

        final String sql = "select weather_forecast_id, name, notes, latitude, longitude, weather_collection_id "
                + "from weather_forecast "
                + "where weather_collection_id = ?;";

        List<WeatherForecast> forecasts = jdbcTemplate.query(sql, new WeatherForecastMapper(), collection.getWeatherCollectionId());
        collection.setForecasts(forecasts);
    }
}
