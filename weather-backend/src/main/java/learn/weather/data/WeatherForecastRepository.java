package learn.weather.data;

import learn.weather.models.WeatherForecast;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface WeatherForecastRepository {

    WeatherForecast findById(int forecastId);

    List<WeatherForecast> findByCollectionId(int collectionId);

    WeatherForecast add(WeatherForecast weatherForecast);

    boolean update(WeatherForecast weatherForecast);

    boolean delete(int forecastId);
}
