package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import java.time.Instant;
import java.util.List;

import com.influxdb.annotations.Column;
import com.influxdb.annotations.Measurement;
import com.influxdb.client.InfluxDBClient;
import com.influxdb.client.InfluxDBClientFactory;
import com.influxdb.client.WriteApi;
import com.influxdb.client.domain.WritePrecision;
import com.influxdb.client.write.Point;

@SpringBootApplication
public class DemoApplication {

	public static void main(String[] args) {


		Point point = Point
				.measurement("mem")
				.addTag("host", "host1")
				.addField("used_percent", 200.01)
				.time(Instant.now(), WritePrecision.NS);

		try (WriteApi writeApi = client.getWriteApi()) {
			writeApi.writePoint(bucket, org, point);
		}
		SpringApplication.run(DemoApplication.class, args);
	}

}
