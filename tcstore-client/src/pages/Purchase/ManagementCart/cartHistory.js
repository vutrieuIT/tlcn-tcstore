import React, { useState, useEffect } from "react";
import productApi from "../../../apis/productApi";
import { Spin, Card } from "antd";
import { Table } from 'antd';
import moment from 'moment';


const CartHistory = () => {
    const [orderList, setOrderList] = useState([]);

    const columns = [
        {
            title: 'Mã đơn hàng',
            dataIndex: '_id',
            key: '_id',
        },
        {
            title: 'Sản phẩm',
            dataIndex: 'products',
            key: 'products',
            render: (products) => (
                <ul>
                    {products.map((item, index) => (
                        <li key={index}>
                            {item.product}
                        </li>
                    ))}
                </ul>
            ),
        },
        {
            title: 'Tổng đơn hàng',
            dataIndex: 'orderTotal',
            key: 'orderTotal',
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Hình thức thanh toán',
            dataIndex: 'billing',
            key: 'billing',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Ngày đặt',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (createdAt) => (
                <span>{moment(createdAt).format('DD/MM/YYYY HH:mm')}</span>
              ),
        },
    ];

    useEffect(() => {
        (async () => {
            try {
                await productApi.getOrderByUser().then((item) => {
                    setOrderList(item);
                });

            } catch (error) {
                console.log('Failed to fetch event detail:' + error);
            }
        })();
        window.scrollTo(0, 0);
    }, [])

    return (
        <div>
            <Spin spinning={false}>
                <div className="container" >
                    <h1 style={{fontSize: 25}}>Quản lý đơn hàng</h1>
                    <Card >
                        <Table columns={columns} dataSource={orderList.data} rowKey='_id' pagination={{ position: ['bottomCenter'] }} />
                    </Card>
                </div>
            </Spin>
        </div >
    );
};

export default CartHistory;
