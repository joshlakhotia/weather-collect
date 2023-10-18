package learn.weather.domain;

import learn.weather.data.WeatherCollectionRepository;
import learn.weather.models.WeatherCollection;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@SpringBootTest
public class WeatherCollectionServiceTest {

    final static String OVER_TEXT = "sit amet cursus sit amet dictum sit amet " +
            "justo donec enim diam vulputate ut pharetra sit amet aliquam id diam " +
            "maecenas ultricies mi eget mauris pharetra et ultrices neque ornare aenean " +
            "euismod elementum nisi quis eleifend quam adipiscing vitae proin sagittis " +
            "nisl rhoncus mattis rhoncus urna neque viverra justo nec";

    @Autowired
    WeatherCollectionService service;

    @MockBean
    WeatherCollectionRepository repository;

    @Test
    void shouldAddWhenValid() {
        WeatherCollection expected = makeCollection();
        WeatherCollection arg = makeCollection();
        arg.setWeatherCollectionId(0);

        when(repository.add(arg)).thenReturn(expected);
        Result<WeatherCollection> result = service.add(arg);
        assertEquals(ActionStatus.SUCCESS, result.getStatus());

        assertEquals(expected, result.getPayload());
    }

    @Test
    void shouldNotAddWhenInvalid() {
        WeatherCollection collection = makeCollection();
        Result<WeatherCollection> result = service.add(collection);
        assertEquals(ActionStatus.INVALID, result.getStatus());

        collection.setWeatherCollectionId(0);
        collection.setName(null);
        result = service.add(collection);
        assertEquals(ActionStatus.INVALID, result.getStatus());

        collection.setName("Test");
        collection.setDescription(OVER_TEXT);
        result = service.add(collection);
        assertEquals(ActionStatus.INVALID, result.getStatus());

        collection.setDescription("Test Description");
        collection.setUserId(0);
        result = service.add(collection);
        assertEquals(ActionStatus.INVALID, result.getStatus());
    }

    private WeatherCollection makeCollection() {
        WeatherCollection collection = new WeatherCollection();
        collection.setWeatherCollectionId(1);
        collection.setName("Test");
        collection.setDescription("Test Description");
        collection.setUserId(1);
        return collection;
    }
}
