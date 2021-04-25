
import scala.concurrent.duration._

import io.gatling.core.Predef._
import io.gatling.http.Predef._
import io.gatling.jdbc.Predef._

class WebAppTest2 extends Simulation {

	val httpProtocol = http
		.baseUrl("https://radarines4bwebapp.herokuapp.com")
		.inferHtmlResources()
		.acceptEncodingHeader("gzip, deflate")
		.acceptLanguageHeader("es-ES,es;q=0.9,en;q=0.8")
		.userAgentHeader("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.85 Safari/537.36")

	val headers_webapp = Map(
		"Accept" -> "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
		"Cache-Control" -> "no-cache",
		"Pragma" -> "no-cache",
		"Sec-Fetch-Dest" -> "document",
		"Sec-Fetch-Mode" -> "navigate",
		"Sec-Fetch-Site" -> "none",
		"Sec-Fetch-User" -> "?1",
		"Upgrade-Insecure-Requests" -> "1",
		"sec-ch-ua" -> """" Not A;Brand";v="99", "Chromium";v="90", "Google Chrome";v="90"""",
		"sec-ch-ua-mobile" -> "?0")

	val headers_restapi = Map(
		"Content-Type" -> "application/json",
		"Referer" -> "https://radarines4bwebapp.herokuapp.com/",
		"sec-ch-ua" -> """" Not A;Brand";v="99", "Chromium";v="90", "Google Chrome";v="90"""",
		"sec-ch-ua-mobile" -> "?0")

	val uriApi = "https://radarines4brestapi.herokuapp.com/api/user/friends"

	val scn = scenario("WebAppTest2")
		.exec(http("request_webapp")
			.get("/")
			.headers(headers_webapp))
		.exec(http("request_restapi")
			.post(uriApi)
			.body(StringBody("{\"URL\": \"https://davidaf.solidcommunity.net/profile/card#me\"}"))
			.headers(headers_restapi))

	setUp(scn.inject(constantUsersPerSec(2) during(30 seconds) randomized)).protocols(httpProtocol)
}