package learn.weather.domain;

import learn.weather.data.WeatherForecastRepository;
import learn.weather.models.WeatherForecast;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WeatherForecastService {

    private final WeatherForecastRepository repository;

    public WeatherForecastService(WeatherForecastRepository repository) {
        this.repository = repository;
    }

    public WeatherForecast findById(int forecastId) { return repository.findById(forecastId); }

    public List<WeatherForecast> findByCollectionId(int collectionId) { return repository.findByCollectionId(collectionId); }

    public Result<WeatherForecast> add(WeatherForecast forecast) {
        Result<WeatherForecast> result = validate(forecast);
        if(!result.isSuccess()) {
            return result;
        }

        if(forecast.getWeatherForecastId() != 0 ) {
            result.addMessage(ActionStatus.INVALID, "weatherForecastId cannot be set for 'add' operation");
            return result;
        }

        forecast = repository.add(forecast);
        result.setPayload(forecast);
        return result;
    }

    public Result<WeatherForecast> update(WeatherForecast forecast) {
        Result<WeatherForecast> result = validate(forecast);
        if(!result.isSuccess()) {
            return result;
        }

        if (forecast.getWeatherForecastId() <= 0) {
            result.addMessage(ActionStatus.INVALID, "weatherForecastId must be set for 'update' operation");
            return result;
        }

        if (!repository.update(forecast)) {
            String msg = String.format("weatherForecastId: %s, not found", forecast.getWeatherForecastId());
            result.addMessage(ActionStatus.NOT_FOUND, msg);
        }

        return result;
    }

    public boolean deleteById(int forecastId) { return repository.delete(forecastId); }

    private Result<WeatherForecast> validate(WeatherForecast forecast) {
        Result<WeatherForecast> result = new Result<>();

        if(forecast == null) {
            result.addMessage(ActionStatus.INVALID, "forecast cannot be null");
            return result;
        }

        if (Validations.isNullOrBlank(forecast.getName()) || forecast.getName().length() > 50) {
            result.addMessage(ActionStatus.INVALID, "Name must be 50 characters or less");
        }

        if (forecast.getNotes().length() > 250) {
            result.addMessage(ActionStatus.INVALID, "Notes must be 250 characters or less");
        }

        if (forecast.getLatitude() < -90 || forecast.getLatitude() > 90) {
            result.addMessage(ActionStatus.INVALID, "Latitude must be between -90 and 90");
        }

        if (forecast.getLongitude() < -180 || forecast.getLongitude() > 180) {
            result.addMessage(ActionStatus.INVALID, "Longitude must be between -90 and 90");
        }

        if (forecast.getWeatherCollectionId() < 1) {
            result.addMessage(ActionStatus.INVALID, "weatherCollectionId must be a positive number");
        }

        return result;
    }
}
