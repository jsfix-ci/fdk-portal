package no.dcat.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import no.dcat.model.Catalog;
import no.dcat.service.CatalogRepository;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithUserDetails;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.HashMap;
import java.util.Map;

import static org.hamcrest.Matchers.containsString;
import static org.springframework.boot.test.context.SpringBootTest.WebEnvironment.RANDOM_PORT;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ActiveProfiles("unit-integration")
@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = RANDOM_PORT)
@AutoConfigureMockMvc
public class CatalogControllerIT {

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private MockMvc mockMvc;


    @Autowired
    private CatalogRepository catalogRepository;


    @Mock
    private PagedResourcesAssembler pagedResourcesAssembler;


    @Before
    public void before() {
        catalogRepository.deleteAll();
    }

    @Test
    @WithUserDetails("03096000854")
    public void webserviceIsRunning() throws Exception {
        mockMvc
                .perform(MockMvcRequestBuilders.get("/catalogs", String.class))
                .andExpect(content().string(containsString("/catalogs")));

    }

    @Test
    @WithUserDetails("03096000854")
    public void catalogAddedBecomesAvailable() throws Exception {
        Catalog catalog = new Catalog();
        String id = "910244132";
        catalog.setId(id);

        Map<String, String> description = new HashMap<>();
        description.put("no", "test");
        catalog.setDescription(description);

        Map<String, String> title = new HashMap<>();
        title.put("no", "test");
        catalog.setTitle(title);

        mockMvc
                .perform(
                        MockMvcRequestBuilders
                                .post("/catalogs", catalog)
                                .content(asJsonString(catalog))
                                .contentType(MediaType.APPLICATION_JSON_UTF8))
                .andExpect(content().string("{\"id\":\"910244132\",\"uri\":\"http://localhost:8099/catalogs/910244132\",\"title\":{\"no\":\"test\"},\"description\":{\"no\":\"test\"},\"publisher\":{\"uri\":\"http://data.brreg.no/enhetsregisteret/enhet/910244132.json\",\"id\":\"910244132\",\"name\":\"RAMSUND OG ROGNAN REVISJON\"}}"))
                .andExpect(status().isOk());

    }

    @Test
    @WithUserDetails("03096000854")
    public void listCatalogs() throws Throwable {

        catalogAddedBecomesAvailable();

        mockMvc
                .perform(
                        MockMvcRequestBuilders
                                .get("/catalogs")
                )
                .andExpect(content().string("{\n" +
                        "  \"_embedded\" : {\n" +
                        "    \"catalogs\" : [ {\n" +
                        "      \"id\" : \"910244132\",\n" +
                        "      \"uri\" : \"http://localhost:8099/catalogs/910244132\",\n" +
                        "      \"title\" : {\n" +
                        "        \"no\" : \"test\"\n" +
                        "      },\n" +
                        "      \"description\" : {\n" +
                        "        \"no\" : \"test\"\n" +
                        "      },\n" +
                        "      \"publisher\" : {\n" +
                        "        \"uri\" : \"http://data.brreg.no/enhetsregisteret/enhet/910244132.json\",\n" +
                        "        \"name\" : \"RAMSUND OG ROGNAN REVISJON\"\n" +
                        "      }\n" +
                        "    } ]\n" +
                        "  },\n" +
                        "  \"_links\" : {\n" +
                        "    \"self\" : {\n" +
                        "      \"href\" : \"http://localhost/catalogs?page=0&size=20\"\n" +
                        "    }\n" +
                        "  },\n" +
                        "  \"page\" : {\n" +
                        "    \"size\" : 20,\n" +
                        "    \"totalElements\" : 1,\n" +
                        "    \"totalPages\" : 1,\n" +
                        "    \"number\" : 0\n" +
                        "  }\n" +
                        "}"))
                .andExpect(status().isOk());


    }

    @Test
    @WithUserDetails("03096000854")
    public void createCatalogWithNoIdFails() throws Exception {

        Catalog catalog = new Catalog();
        catalog.setId(null);

        mockMvc
                .perform(
                        MockMvcRequestBuilders
                                .post("/catalogs", catalog)
                                .content(asJsonString(catalog))
                                .contentType(MediaType.APPLICATION_JSON_UTF8))
                .andExpect(status().isForbidden());

    }


    @Test
    @WithUserDetails("03096000854")
    public void updateCatalogRunsOK() throws Exception {
        Catalog catalog = new Catalog();
        catalog.setId("910244132");

        Map<String, String> title = new HashMap<>();
        title.put("no", "test");
        catalog.setTitle(title);


        String contentAsString = mockMvc
                .perform(
                        MockMvcRequestBuilders
                                .post("/catalogs", catalog)
                                .content(asJsonString(catalog))
                                .contentType(MediaType.APPLICATION_JSON_UTF8))
                .andExpect(content().string("{\"id\":\"910244132\",\"uri\":\"http://localhost:8099/catalogs/910244132\",\"title\":{\"no\":\"test\"},\"description\":{},\"publisher\":{\"uri\":\"http://data.brreg.no/enhetsregisteret/enhet/910244132.json\",\"id\":\"910244132\",\"name\":\"RAMSUND OG ROGNAN REVISJON\"}}"))
                .andExpect(status().isOk())
                .andReturn().getResponse().getContentAsString();

        catalog = new Gson().fromJson(contentAsString, Catalog.class);


        // change title
        Map<String, String> title2 = new HashMap<>();
        title2.put("en", "aTest");
        catalog.setTitle(title2);


        mockMvc
                .perform(
                        MockMvcRequestBuilders
                                .post("/catalogs", catalog)
                                .content(asJsonString(catalog))
                                .contentType(MediaType.APPLICATION_JSON_UTF8))
                .andExpect(content().string("{\"id\":\"910244132\",\"uri\":\"http://localhost:8099/catalogs/910244132\",\"title\":{\"en\":\"aTest\"},\"description\":{},\"publisher\":{\"uri\":\"http://data.brreg.no/enhetsregisteret/enhet/910244132.json\",\"id\":\"910244132\",\"name\":\"RAMSUND OG ROGNAN REVISJON\"}}"))
                .andExpect(status().isOk());

    }

    @Test
    @WithUserDetails("03096000854")
    public void deleteCatalogRunsOK() throws Exception {
        String catalogId = "910244132";
        Map<String, String> title = new HashMap<>();
        title.put("no", "test");

        Catalog catalog = new Catalog();
        catalog.setId(catalogId);
        catalog.setTitle(title);

        mockMvc
                .perform(
                        MockMvcRequestBuilders
                                .post("/catalogs", catalog)
                                .content(asJsonString(catalog))
                                .contentType(MediaType.APPLICATION_JSON_UTF8))
                .andExpect(status().isOk());

        mockMvc
                .perform(MockMvcRequestBuilders.delete("/catalogs/" + catalogId))
                .andExpect(status().isOk());

    }

    public static String asJsonString(final Object obj) {
        try {
            final ObjectMapper mapper = new ObjectMapper();
            final String jsonContent = mapper.writeValueAsString(obj);
            return jsonContent;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}