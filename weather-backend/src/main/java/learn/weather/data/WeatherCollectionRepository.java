package learn.weather.data;

import learn.weather.models.WeatherCollection;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface WeatherCollectionRepository {

    List<WeatherCollection> findByUserId(int userId);

    WeatherCollection findById(int collectionId);

    WeatherCollection add(WeatherCollection collection);

    boolean update(WeatherCollection collection);

    @Transactional
    boolean deleteById(int collectionId);
}
