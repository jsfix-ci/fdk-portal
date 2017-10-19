package no.dcat.service;

import no.dcat.model.Dataset;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

public interface DatasetRepository extends ElasticsearchRepository<Dataset, String> {


    Page<Dataset> findByCatalogId(String catalogId, Pageable pageable);

    Page<Dataset> findByCatalogIdAndRegistrationStatus(String catalogId, String status, Pageable pageable);

}
