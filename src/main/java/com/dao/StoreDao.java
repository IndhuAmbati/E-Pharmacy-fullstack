package com.dao;

import com.model.Store;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public class StoreDao {

    @Autowired
    private StoreRepository storeRepository;

    public List<Store> findAll() {
        return storeRepository.findAll();
    }

    public Store save(Store store) {
        return storeRepository.save(store);
    }

    public Optional<Store> findById(Long id) {
        return storeRepository.findById(id);
    }

    public void deleteById(Long id) {
        storeRepository.deleteById(id);
    }
}
