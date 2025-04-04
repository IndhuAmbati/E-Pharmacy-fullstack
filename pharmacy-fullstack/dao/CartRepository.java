package com.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.model.Cart;

@Repository
interface CartRepository extends JpaRepository<Cart, Integer>{

}
