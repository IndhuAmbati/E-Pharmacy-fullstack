package com.Controller;

import com.dao.StoreDao;
import com.model.Store;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/store")
@CrossOrigin(origins = "*")
public class StoreController {

    @Autowired
    private StoreDao storeDao;

    @GetMapping("/getAllStores")
    public List<Store> getAllStores() {
        return storeDao.findAll();
    }

    @PostMapping("/addStore")
    public Store addStore(@RequestBody Store store) {
        return storeDao.save(store);
    }

    @PutMapping("/updateStore/{id}")
    public Store updateStore(@PathVariable Long id, @RequestBody Store updatedStore) {
        return storeDao.findById(id).map(store -> {
            store.setName(updatedStore.getName());
            store.setAddress(updatedStore.getAddress());
            store.setHasStock(updatedStore.isHasStock());
            store.setDistance(updatedStore.getDistance());
            return storeDao.save(store);
        }).orElse(null);
    }

    @DeleteMapping("/deleteStore/{id}")
    public void deleteStore(@PathVariable Long id) {
        storeDao.deleteById(id);
    }
}
