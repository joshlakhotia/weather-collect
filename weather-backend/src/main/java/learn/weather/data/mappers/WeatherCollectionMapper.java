package learn.weather.data.mappers;

import learn.weather.models.WeatherCollection;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class WeatherCollectionMapper implements RowMapper<WeatherCollection> {
    @Override
    public WeatherCollection mapRow(ResultSet rs, int rowNum) throws SQLException {
        WeatherCollection collection = new WeatherCollection();
        collection.setWeatherCollectionId(rs.getInt("weather_collection_id"));
        collection.setName(rs.getString("name"));
        collection.setDescription(rs.getString("description"));
        collection.setUserId(rs.getInt("app_user_id"));
        return collection;
    }
}
