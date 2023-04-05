import React from 'react';
import { Helmet } from 'react-helmet';
import Banner2 from '../components/shared/Banner2/Banner2';

import shopData from '../components/Shop/shopData';
import Tabs from '../components/Shop/Tabs';


const Shop = () => {

    return (
        <div>
            <Helmet>
                <title>BB Restaurant |  Shop</title>
            </Helmet>
            <Banner2 banner={{ title: 'Our Shop', description: 'Would you like to try a dish?', image: 'bg-shop-banner' }}></Banner2>
            <Tabs shopData={shopData}></Tabs>
            
        </div>
    );
};

export default Shop;