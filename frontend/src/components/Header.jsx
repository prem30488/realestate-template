import React from 'react';

const Header = () => {
  return (
    <>
      <header className="header header-sticky">
        <div className="header-bottom menu-center">
          <div className="container">
            <div className="row justify-content-between">

              <div className="col mt-10 mb-10">
                <div className="logo">
                  <a href="index.html"><img src="assets/images/logo.png" alt="" /></a>
                </div>
              </div>

              <div className="col d-none d-lg-flex">
                <nav className="main-menu">
                  <ul>
                    <li className="has-dropdown"><a href="index.html">Home</a>
                      <ul className="sub-menu">
                        <li><a href="index.html">Home one</a></li>
                        <li><a href="index-2.html">Home two</a></li>
                        <li><a href="index-3.html">Home three</a></li>
                      </ul>
                    </li>
                    <li className="has-dropdown"><a href="properties.html">Properties</a>
                      <ul className="sub-menu">
                        <li className="has-dropdown"><a href="properties.html">Properties Grid</a>
                          <ul className="sub-menu">
                            <li><a href="properties.html">Default Layout</a></li>
                            <li><a href="properties-left-sidebar.html">Left Sidebar</a></li>
                            <li><a href="properties-right-sidebar.html">Right Sidebar</a></li>
                          </ul>
                        </li>
                        <li className="has-dropdown"><a href="properties-list-left-sidebar.html">Properties List</a>
                          <ul className="sub-menu">
                            <li><a href="properties-list-left-sidebar.html">Left Sidebar</a></li>
                            <li><a href="properties-list-right-sidebar.html">Right Sidebar</a></li>
                          </ul>
                        </li>
                        <li className="has-dropdown"><a href="properties-carousel.html">Properties Carousel</a>
                          <ul className="sub-menu">
                            <li><a href="properties-carousel.html">Carousel Single Row</a></li>
                            <li><a href="properties-carousel2.html">Carousel Double Row</a></li>
                          </ul>
                        </li>
                        <li className="has-dropdown"><a href="single-properties.html">Single Properties</a>
                          <ul className="sub-menu">
                            <li><a href="single-properties.html">Left Sidebar</a></li>
                            <li><a href="single-properties-right-sidebar.html">Right Sidebar</a></li>
                            <li><a href="single-properties-gallery.html">With Gallrey</a></li>
                          </ul>
                        </li>
                      </ul>
                    </li>
                    <li className="has-dropdown"><a href="agent.html">agents</a>
                      <ul className="sub-menu">
                        <li className="has-dropdown"><a href="agents.html">Agents Grid</a>
                          <ul className="sub-menu">
                            <li><a href="agents-3-column.html">Three Column</a></li>
                            <li><a href="agents.html">Four Column</a></li>
                          </ul>
                        </li>
                        <li className="has-dropdown"><a href="agents-carousel-3-column.html">Agents Carousel</a>
                          <ul className="sub-menu">
                            <li><a href="agents-carousel-3-column.html">Three Column</a></li>
                            <li><a href="agents-carousel2-3-column.html">Three Column Double Row</a></li>
                            <li><a href="agents-carousel-4-column.html">Four Column</a></li>
                            <li><a href="agents-carousel2-4-column.html">Four Column Double Row</a></li>
                          </ul>
                        </li>
                        <li><a href="agent-details.html">Agent Details</a></li>
                      </ul>
                    </li>
                    <li className="has-dropdown"><a href="agencies.html">Agencies</a>
                      <ul className="sub-menu">
                        <li><a href="agencies.html">Agencies</a></li>
                        <li><a href="agency-details.html">Agency Details</a></li>
                      </ul>
                    </li>
                    <li className="has-dropdown"><a href="news.html">News</a>
                      <ul className="sub-menu">
                        <li><a href="news.html">Default Layout</a></li>
                        <li><a href="news-left-sidebar.html">Left Sidebar</a></li>
                        <li><a href="news-right-sidebar.html">Right Sidebar</a></li>
                        <li><a href="news-carousel.html">Carousel Single Row</a></li>
                        <li><a href="news-carousel2.html">Carousel Double Row</a></li>
                        <li><a href="news-details.html">Details Left Sidebar</a></li>
                        <li><a href="news-details-right-sidebar.html">Details Right Sidebar</a></li>
                      </ul>
                    </li>
                    <li className="has-dropdown"><a href="#">pages</a>
                      <ul className="sub-menu">
                        <li><a href="about-us.html">About us</a></li>
                        <li><a href="add-properties.html">Add Properties</a></li>
                        <li><a href="contact-us.html">Contact us</a></li>
                        <li><a href="gallery-2-column.html">Gallery 2 Column</a></li>
                        <li><a href="gallery-3-column.html">Gallery 3 Column</a></li>
                        <li><a href="gallery-4-column.html">Gallery 4 Column</a></li>
                        <li><a href="login-register.html">Login & Register</a></li>
                        <li><a href="my-account.html">My Account</a></li>
                      </ul>
                    </li>
                  </ul>
                </nav>
              </div>

              <div className="col mr-sm-50 mr-xs-50">
                <div className="header-user">
                  <a href="login-register.html" className="user-toggle"><i className="pe-7s-user"></i><span>Login or Register</span></a>
                </div>
              </div>
            </div>


            <div className="row">
              <div className="col-12 d-flex d-lg-none">
                <div className="mobile-menu"></div>
              </div>
            </div>


          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
