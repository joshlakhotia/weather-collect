package learn.weather.data.mappers;

import learn.weather.models.WeatherForecast;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class WeatherForecastMapper implements RowMapper<WeatherForecast> {
    @Override
    public WeatherForecast mapRow(ResultSet rs, int rowNum) throws SQLException {
        WeatherForecast forecast = new WeatherForecast();

        forecast.setWeatherForecastId(rs.getInt("weather_forecast_id"));
        forecast.setName(rs.getString("name"));
        if(rs.getString("notes") != null) {
            forecast.setNotes(rs.getString("notes"));
        };
        forecast.setLatitude(rs.getDouble("latitude"));
        forecast.setLatitude(rs.getDouble("longitude"));
        forecast.setWeatherCollectionId(rs.getInt("weather_collection_id"));

        return forecast;
    }
}
