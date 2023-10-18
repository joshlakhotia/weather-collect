package learn.weather.data;

import learn.weather.data.mappers.WeatherForecastMapper;
import learn.weather.models.WeatherForecast;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;

@Repository
public class WeatherForecastJdbcTemplateRepository implements WeatherForecastRepository{

    private final JdbcTemplate jdbcTemplate;

    public WeatherForecastJdbcTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }
    @Override
    public WeatherForecast findById(int forecastId) {
        final String sql = "select weather_forecast_id, name, notes, latitude, longitude, weather_collection_id "
                + "from weather_forecast "
                + "where weather_forecast_id = ?;";

        return jdbcTemplate.query(sql, new WeatherForecastMapper(), forecastId).stream()
                .findFirst().orElse(null);
    }

    @Override
    public List<WeatherForecast> findByCollectionId(int collectionId) {

        final String sql = "select weather_forecast_id, `name`, `notes`, latitude, longitude, weather_collection_id "
                + "from weather_forecast "
                + "where weather_collection_id = ?;";

        return jdbcTemplate.query(sql, new WeatherForecastMapper(), collectionId);
    }

    @Override
    public WeatherForecast add(WeatherForecast weatherForecast) {

        final String sql = "insert into weather_forecast (name, notes, latitude, longitude, weather_collection_id) "
                + " values (?,?,?,?,?);";

        KeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, weatherForecast.getName());
            ps.setString(2, weatherForecast.getNotes() == null ? null : weatherForecast.getNotes());
            ps.setDouble(3, weatherForecast.getLatitude());
            ps.setDouble(4, weatherForecast.getLatitude());
            ps.setInt(5, weatherForecast.getWeatherCollectionId());
            return ps;
        }, keyHolder);

        if (rowsAffected <= 0) {
            return null;
        }

        weatherForecast.setWeatherForecastId(keyHolder.getKey().intValue());
        return weatherForecast;
    }

    @Override
    public boolean update(WeatherForecast weatherForecast) {

        final String sql = "update weather_forecast set "
                + "name = ?, "
                + "notes = ?, "
                + "latitude = ?, "
                + "longitude = ? "
                + "where weather_forecast_id = ?;";

        return jdbcTemplate.update(sql,
                weatherForecast.getName(),
                weatherForecast.getNotes(),
                weatherForecast.getLatitude(),
                weatherForecast.getLongitude(),
                weatherForecast.getWeatherForecastId()) > 0;
    }

    @Override
    public boolean delete(int forecastId) {
        return jdbcTemplate.update("delete from weather_forecast where weather_forecast_id = ?;", forecastId) > 0;
    }
}
