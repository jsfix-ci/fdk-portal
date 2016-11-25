package no.dcat.portal.webapp;

import no.dcat.portal.webapp.comparator.ThemeTitleComparator;
import no.difi.dcat.datastore.domain.dcat.DataTheme;
import no.difi.dcat.datastore.domain.dcat.Dataset;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.StatusLine;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.utils.HttpClientUtils;
import org.apache.http.client.utils.URIBuilder;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.util.EntityUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.net.URI;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * Delivers html pages to support the DCAT Portal application.
 * <p>
 * <p>
 * Created by nodavsko on 12.10.2016.
 */
@Controller
public class PortalController {
    public static final String MODEL_THEME = "theme";
    private static Logger logger = LoggerFactory.getLogger(PortalController.class);

    private final PortalConfiguration buildMetadata;

    @Autowired
    public PortalController(final PortalConfiguration metadata) {
        this.buildMetadata = metadata;
    }

    /**
     * The result page. Sets callback service and version identification and returns
     * result.html page.
     *
     * @param session the session object
     * @return the result html page (or just the name of the page)
     */
    @RequestMapping(value = {"/results"})
    final ModelAndView result(final HttpSession session, @RequestParam(value = "q", defaultValue = "") String q, @RequestParam(value = "theme", defaultValue = "") String theme) {
        session.setAttribute("dcatQueryService", buildMetadata.getQueryServiceUrl());
        ModelAndView model = new ModelAndView("result");

        logger.debug(buildMetadata.getQueryServiceUrl());
        logger.debug(buildMetadata.getVersionInformation());

        session.setAttribute("versionInformation", buildMetadata.getVersionInformation());
        session.setAttribute("theme", theme);

        model.addObject("query", q);
        return model; // templates/result.html
    }

    /**
     * Controller for getting the dataset corresponding to the provided id.
     *
     * @param id The id that identifies the dataset.
     * @return One Dataset attatched to a ModelAndView.
     */
    @RequestMapping({"/detail"})
    public ModelAndView detail(@RequestParam(value = "id", defaultValue = "") String id) {
        ModelAndView model = new ModelAndView("detail");

        try {
            URI uri = new URIBuilder(buildMetadata.getRetrieveDatasetServiceUrl()).addParameter("id", id).build();
            HttpClient httpClient = HttpClientBuilder.create().build();

            logger.debug(String.format("Query for dataset: %s", uri.getQuery()));
            String json = httpGet(httpClient, uri);

            logger.debug(String.format("Found dataset: %s", json));
            Dataset dataset = new ElasticSearchResponse().toListOfObjects(json, Dataset.class).get(0);

            dataset = new ResponseManipulation().fillWithAlternativeLangValIfEmpty(dataset, "nb");
            model.addObject("dataset", dataset);
        } catch (Exception e) {
            logger.error(String.format("An error occured: %s", e.getMessage()));
            model.addObject("exceptionmessage", e.getMessage());
            model.setViewName("error");
        }

        return model;
    }

    /**
     * Controller for getting all themes loaded in elasticsearch.
     *
     * @return A list of DatatTheme attatched to a ModelAndView.
     */
    @RequestMapping({"/"})
    public ModelAndView themes() {
        ModelAndView model = new ModelAndView(MODEL_THEME);
        List<DataTheme> dataThemes = new ArrayList<>();
        URI uri;

        try {
            HttpClient httpClient = HttpClientBuilder.create().build();
            uri = new URIBuilder(buildMetadata.getRetrieveDatathemesServiceURL()).build();
            logger.debug("Query for all themes");

            String json = httpGet(httpClient, uri);

            dataThemes = new ElasticSearchResponse().toListOfObjects(json, DataTheme.class);

            Collections.sort(dataThemes , new ThemeTitleComparator());

            logger.debug(String.format("Found datathemes: %s", json));
        } catch (Exception e) {
            logger.error(String.format("An error occured: %s", e.getMessage()));
            model.addObject("exceptionmessage", e.getMessage());
            model.setViewName("error");
        }

        model.addObject("themes", dataThemes);
        model.addObject("dataitemquery", new DataitemQuery());
        return model;
    }

    private String httpGet(HttpClient httpClient, URI uri) throws IOException {
        HttpEntity entity;
        HttpResponse response = null;
        String json = null;
        try {
            HttpGet getRequest = new HttpGet(uri);
            response = httpClient.execute(getRequest);

            checkStatusCode(response);

            entity = response.getEntity();

            json = EntityUtils.toString(entity, "UTF-8");

            // Release used resources.
            EntityUtils.consume(entity);
        } finally {
            // Release used resources.
            if (response != null) {
                HttpClientUtils.closeQuietly(response);
            }
        }
        return json;
    }

    private void checkStatusCode(final HttpResponse response) {
        StatusLine statusLine = response.getStatusLine();
        if (statusLine.getStatusCode() != HttpStatus.OK.value()) {
            logger.error(String.format("Query failed, http-code: %s, reason: %s", statusLine.getStatusCode(), statusLine.getReasonPhrase()));
            throw new RuntimeException(String.format("Query failed, http-code: %s, reason: %s", statusLine.getStatusCode(), statusLine.getReasonPhrase()));
        }
    }
}
