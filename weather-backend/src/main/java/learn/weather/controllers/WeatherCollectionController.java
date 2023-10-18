package learn.weather.controllers;

import learn.weather.domain.Result;
import learn.weather.domain.WeatherCollectionService;
import learn.weather.models.WeatherCollection;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/collection")
public class WeatherCollectionController {

    private final WeatherCollectionService service;

    public WeatherCollectionController(WeatherCollectionService service) {
        this.service = service;
    }

    @GetMapping("/{collectionId}")
    public WeatherCollection findById(@PathVariable int collectionId) { return service.findById(collectionId); }

    @GetMapping("/my-collections/{userId}")
    public List<WeatherCollection> findByUserId(@PathVariable int userId) { return service.findByUserId(userId); }

    @PostMapping
    public ResponseEntity<Object> add(@RequestBody WeatherCollection collection) {
        Result<WeatherCollection> result = service.add(collection);
        if (result.isSuccess()) {
            return new ResponseEntity<>(result.getPayload(), HttpStatus.CREATED);
        }
        return ErrorResponse.build(result);
    }

    @PutMapping("/{collectionId}")
    public ResponseEntity<Object> update(@PathVariable int collectionId, @RequestBody WeatherCollection collection) {
        if (collectionId != collection.getWeatherCollectionId()) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }

        Result<WeatherCollection> result = service.update(collection);
        if(result.isSuccess()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return ErrorResponse.build(result);
    }

    @DeleteMapping("/{collectionId}")
    public ResponseEntity<Void> deleteById(@PathVariable int collectionId) {
        if (service.deleteById(collectionId)) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}

