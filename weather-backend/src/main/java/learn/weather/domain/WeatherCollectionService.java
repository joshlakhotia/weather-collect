package learn.weather.domain;

import learn.weather.data.WeatherCollectionRepository;
import learn.weather.models.WeatherCollection;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WeatherCollectionService {

    private final WeatherCollectionRepository repository;

    public WeatherCollectionService(WeatherCollectionRepository repository) {
        this.repository = repository;
    }

    public List<WeatherCollection> findByUserId(int userId) { return repository.findByUserId(userId); }

    public WeatherCollection findById(int collectionId) { return repository.findById(collectionId); }

    public Result<WeatherCollection> add(WeatherCollection collection) {
        Result<WeatherCollection> result = validate(collection);

        if(!result.isSuccess()) {
            return result;
        }

        if(collection.getWeatherCollectionId() != 0) {
            result.addMessage(ActionStatus.INVALID, "collectionId cannot be set for 'add' operation");
            return result;
        }

        collection = repository.add(collection);
        result.setPayload(collection);
        return result;
    }

    public Result<WeatherCollection> update(WeatherCollection collection) {
        Result<WeatherCollection> result = validate(collection);

        if (!result.isSuccess()) {
            return result;
        }

        if (collection.getWeatherCollectionId() <= 0) {
            result.addMessage(ActionStatus.INVALID, "collectionId must be set for 'update' operation");
            return result;
        }

        if (!repository.update(collection)) {
            String msg = String.format("collectionId: %s not found", collection.getWeatherCollectionId());
            result.addMessage(ActionStatus.NOT_FOUND, msg);
        }

        return result;
    }

    public boolean deleteById(int collectionId) { return repository.deleteById(collectionId); }

    private Result<WeatherCollection> validate(WeatherCollection collection) {
        Result<WeatherCollection> result = new Result<>();

        if(collection == null) {
            result.addMessage(ActionStatus.INVALID, "collection cannot be null");
            return result;
        }

        if(Validations.isNullOrBlank(collection.getName()) || collection.getName().length() > 50) {
            result.addMessage(ActionStatus.INVALID, "name is required and must be 50 characters or less");
        }

        if(collection.getDescription().length() > 250) {
            result.addMessage(ActionStatus.INVALID, "notes  must be 250 characters or less");
        }

        if(collection.getUserId() < 1) {
            result.addMessage(ActionStatus.INVALID, "userId must be a positive number");
        }

        return result;
    }
}
