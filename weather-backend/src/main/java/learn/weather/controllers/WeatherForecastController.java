package learn.weather.controllers;

import learn.weather.domain.Result;
import learn.weather.domain.WeatherForecastService;
import learn.weather.models.WeatherForecast;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/forecast")
public class WeatherForecastController {

    private final WeatherForecastService service;

    public WeatherForecastController(WeatherForecastService service) {
        this.service = service;
    }

    @GetMapping("/{forecastId}")
    public WeatherForecast findById(@PathVariable int forecastId) {
        return service.findById(forecastId);
    }

    @GetMapping("/collection/{collectionId}")
    public List<WeatherForecast> findByCollectionId(@PathVariable int collectionId) {
        return service.findByCollectionId(collectionId);
    }

    @PostMapping
    public ResponseEntity<Object> add(@RequestBody WeatherForecast forecast) {
        Result<WeatherForecast> result = service.add(forecast);
        if (result.isSuccess()) {
            return new ResponseEntity<>(result.getPayload(), HttpStatus.CREATED);
        }
        return ErrorResponse.build(result);
    }

    @PutMapping("/{forecastId}")
    public ResponseEntity<Object> update(@PathVariable int forecastId, @RequestBody WeatherForecast forecast) {
        System.out.println("trying to match");
        if (forecastId != forecast.getWeatherForecastId()) {
            System.out.println(forecastId);
            System.out.println(forecast.getWeatherForecastId());
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }

        Result<WeatherForecast> result = service.update(forecast);
        if (result.isSuccess()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        return ErrorResponse.build(result);
    }

    @DeleteMapping("/{forecastId}")
    public ResponseEntity<Void> deleteById(@PathVariable int forecastId) {
        if (service.deleteById(forecastId)) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
