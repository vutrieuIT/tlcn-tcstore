import React from 'react';
import { Layout } from 'antd';
import { Col, Row, Divider } from "antd";
import { SocialIcon } from 'react-social-icons';
import "./footer.css";
import GHN from '../../../assets/footer/GHN.png';
import GHTK from '../../../assets/footer/GHTK.png';
import GHEMS from '../../../assets/footer/GHEMS.png';
import i5 from '../../../assets/footer/5.png';
import i6 from '../../../assets/footer/6.png';
import i7 from '../../../assets/footer/7.png';
import i8 from '../../../assets/footer/8.png';
import i9 from '../../../assets/footer/9.png';
import i10 from '../../../assets/footer/10.png';

const { Footer } = Layout;

function _Footer() {
    return (

        <Footer className="footer-style">
            <Row className="footer-desktop">
                <Col span={3} className="footer">
                    <strong className="strongst">Tổng đài hỗ trợ</strong>
                    <p className="pst">Gọi mua hàng 1800.2097</p>
                    <p className="pst">Gọi khiếu nại 1800.2063</p>
                    <p className="pst">Gọi bảo hành 1800.2064</p>
                </Col>
                <Col span={5} className="footer">
                    <strong className="strongst">Thông tin và chính sách</strong>
                    <p className="pst">Mua hàng và thanh toán Online</p>
                    <p className="pst">Mua hàng trả góp Online</p>
                    <p className="pst">Tra thông tin bảo hành</p>
                </Col>
                <Col span={5} className="footer">
                    <strong className="strongst">Dịch vụ và thông tin khác</strong>
                    <p className="pst">Ưu đãi thanh toán</p>
                    <p className="pst">Quy chế hoạt động</p>
                    <p className="pst">Chính sách Bảo hành</p>
                    <p className="pst">Liên hệ hợp tác kinh doanh</p>
                </Col>
                <Col span={5} className="footer">
                    <h4 className="strongst">ĐƠN VỊ VẬN CHUYỂN</h4>
                    <ul className="li-style flex-sty">
                        <li>
                            <img src={GHN} width={70} alt="GHN"></img>
                        </li>
                        <li>
                            <img src={GHTK} width={70} alt="GHTK"></img>
                        </li>
                        <li>
                            <img src={GHEMS} width={70} alt="GHEMS"></img>
                        </li>
                    </ul>
                    <h4 className="strongst">CÁCH THỨC THANH TOÁN</h4>
                    <ul className="li-style flex-sty">
                        <li>
                            <img src={i5} width={70} alt="i5"></img>
                        </li>
                        <li>
                            <img src={i6} width={70} alt="i6"></img>
                        </li>
                        <li>
                            <img src={i7} width={70} alt="i7"></img>
                        </li>
                        <li>
                            <img src={i8} width={70} alt="i8"></img>
                        </li>
                    </ul>

                    <ul className="li-style flex-sty">

                        <li>
                            <img src={i9} width={70} alt="i9"></img>
                        </li>
                        <li>
                            <img src={i10} width={70} alt="i10"></img>
                        </li>
                    </ul>
                    <br></br>
                </Col>
                <Col span={12} className="footer">
                    <strong className="strongst">Địa chỉ</strong>
                    <p className="pst">01 Võ Văn Ngân, Thành Phố Thủ Đức, Thành phố Hồ Chí Minh</p>
                </Col>
                <Col span={6} className="footer">
                    <strong className="strongKNst ">Kết nối với chúng tôi</strong>
                    <Row style={{ marginTop: 10 }}>
                        <Col span={5}>
                            <SocialIcon url="https://www.youtube.com" className="icon" />
                        </Col>
                        <Col span={5}>
                            <SocialIcon url="https://www.facebook.com" className="icon" />
                        </Col>
                        <Col span={5}>
                            <SocialIcon url="https://www.instagram.com" className="icon" />
                        </Col>
                        <Col span={5}>
                            <SocialIcon url="https://www.tiktok.com" className="icon" />
                        </Col>
                    </Row>

                </Col>
            </Row>
            <div className="footer-mobile">
                <Row justify="center">
                    <strong className="strongst-mb">Home Page</strong>
                </Row>
                <Row justify="center">
                    <p className="pst">About Us</p>
                </Row>
                <Row justify="center">
                    <strong className="strongst2-mb">Our Connection</strong>
                </Row>
                <Row justify="center">
                    <p className="pst">TECHCOMP Store</p></Row>
                <Row justify="center">
                    <strong style={{ color: "#FFFFFF", fontSize: 20, marginBottom: 30, cursor: "pointer" }}>Follow Us</strong>
                </Row>

                <Row style={{ marginTop: 5 }} justify="center">
                    <Col >
                        <SocialIcon url="https://www.youtube.com" className="icon" />
                    </Col>
                    <Col style={{ marginLeft: 20 }}>
                        <SocialIcon url="https://www.facebook.com" className="icon" />
                    </Col>
                    <Col style={{ marginLeft: 20 }}>
                        <SocialIcon url="https://www.instagram.com" className="icon" />
                    </Col>
                    <Col style={{ marginLeft: 20 }}>
                        <SocialIcon url="https://www.tiktok.com" className="icon" />
                    </Col>
                </Row>
            </div>
        </Footer>
    );
}

export default _Footer;