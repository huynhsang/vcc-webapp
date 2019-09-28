import React from 'react';
import { useTranslation } from 'react-i18next';

import Slider from 'react-slick';
import $ from 'jquery';

//Todo : use React
$(function() {
  $('.menu-mb').click(function() {
    $('.menu-mb').toggleClass('active');
    $('.show-menu-dk').toggle('slow');
  });
});

const LandingPage = ({}) => {

  const {t} = useTranslation();

  const slideAtMainBackgroundRef = React.useRef();
  const sliderAtPeopleReviewRef = React.useRef();

  const nextAtMainBackground = () => {
    slideAtMainBackgroundRef.current.slickNext();
  };

  const previousAtMainBackground = () => {
    slideAtMainBackgroundRef.current.slickPrev();
  };

  const nextAtPeopleReview = () => {
    sliderAtPeopleReviewRef.current.slickNext();
  };

  const previousAtPeopleReview = () => {
    sliderAtPeopleReviewRef.current.slickPrev();
  };

  const singleItem = {
    arrows: false,
    autoplay: true,
    fade: true,
    autoplaySpeed: 5000,
  };
  const doubleItem = {
    autoplay: true,
    arrows: false,
    slidesToShow: 2,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1007,
        settings: {
          slidesToShow: 2,
        },
      },

      {
        breakpoint: 784,
        settings: {
          slidesToShow: 1,
          centerMode: true,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          centerMode: true,
        },
      },
    ],
  };
  return (
    <div className="bg-unauthenticated">
      <nav className="navbar menu-bar">
        <div className="menu-item">
          <a href="/">
            <h3>VC&C</h3>
          </a>
        </div>
        <div className="show-menu-dk">
          <div className="menu-dk">
            <a href="/">About us</a>
            <a href="/">Login</a>
            <a href="/">Contact us</a>
            <a href="/">Language</a>
            <a href="/">
              <i className="fa fa-search" /> Search
            </a>
          </div>
        </div>
        <div className="menu-mb">
          <span />
          <span />
          <span />
        </div>
      </nav>

      <Slider
        ref={slideAtMainBackgroundRef}
        {...singleItem}
        className="single-item"
      >
        <section key={1}>
          <div
            style={{
              backgroundImage:
                'url(' +
                require(`../../../static/resources/img/bg-1.jpg`) +
                ')',
              backgroundPosition: 'center center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
            }}
          >
            <div
              className="arrow-left arrow"
              onClick={previousAtMainBackground}
            ></div>
            <div className="opacity">
              <img
                src={require('../../../static/resources/img/bg-1.jpg')}
                alt=""
                className="img-responsive"
                style={{ maxHeight: '600px' }}
              />
            </div>
            <div className="text-content text-white text-center">
              <h1>
                VIETNAMESE
                <br />
                COUNSELING & CONNECTING
              </h1>
            </div>
            <div
              className="arrow-right arrow"
              onClick={nextAtMainBackground}
            ></div>
          </div>
        </section>
        <section key={2}>
          <div
            style={{
              backgroundImage:
                'url(' +
                require('../../../static/resources/img/bg-2.jpg') +
                ')',
              backgroundPosition: 'center center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
            }}
          >
            <div
              className="arrow-left arrow"
              onClick={previousAtMainBackground}
            ></div>
            <div className="opacity">
              <img
                src={require('../../../static/resources/img/bg-2.jpg')}
                alt=""
                className="img-responsive"
                style={{ maxHeight: '600px' }}
              />
            </div>
            <div className="text-content text-white text-center">
              <h1>
                VIETNAMESE
                <br />
                COUNSELING & CONNECTING
              </h1>
            </div>
            <div
              className="arrow-right arrow"
              onClick={nextAtMainBackground}
            ></div>
          </div>
        </section>
        <section key={3}>
          <div
            style={{
              backgroundImage:
                'url(' +
                require('../../../static/resources/img/bg-3.jpg') +
                ')',
              backgroundPosition: 'center center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
            }}
          >
            <div
              className="arrow-left arrow"
              onClick={previousAtMainBackground}
            ></div>
            <div className="opacity">
              <img
                src={require('../../../static/resources/img/bg-3.jpg')}
                alt=""
                className="img-responsive"
                style={{ maxHeight: '600px' }}
              />
            </div>
            <div className="text-content text-white text-center">
              <h1>
                VIETNAMESE
                <br />
                COUNSELING & CONNECTING
              </h1>
            </div>
            <div
              className="arrow-right arrow"
              onClick={nextAtMainBackground}
            ></div>
          </div>
        </section>
      </Slider>

      <section className="container bg-white middle-content-1">
        <h3 className="title-h3">Let's get you connected!</h3>
        <p>You are just one step away from your wildest dream</p>
        <p>Ask a question now and we'll connect you with a professional!</p>
        <button className="btn-more">Join now</button>
      </section>

      <section className="title-line">
        <div className="line-left straight-line"></div>
        <h2 className="text-center">FOLLOW THE DAILY NEWS</h2>
        <div className="line-right straight-line"></div>
      </section>

      <section className="container middle-content-2 bg-white">
        <div className="row gallery">
          <div className="col-md-8 card-1">
            <div className="mb-3 c-image">
              <div className="pics">
                <img
                  className="img-fluid"
                  src={require('../../../static/resources/img/garelly-bg-tile-floor.jpg')}
                  alt="floor"
                />
              </div>
              <div className="pics">
                <img
                  className="img-fluid"
                  src={require('../../../static/resources/img/garelly-avatar-1.jpg')}
                  alt="avatar"
                />
              </div>
            </div>
            <div className="mb-3 picture">
              <div className="item-1">
                <img
                  className="mb-3 img-fluid"
                  src={require('../../../static/resources/img/garelly-camera.jpg')}
                  alt=""
                />
              </div>
              <div className="item-2">
                <div className="mb-3 middle-content">
                  <div>
                    <h1 className="text-center">Where our story begins</h1>
                    <a href="/">
                      <img
                        className="img-responsive"
                        width="50"
                        src={require('../../../static/resources/img/arrow-circle.svg')}
                        alt=""
                      />
                    </a>
                  </div>
                </div>
                <img
                  className="mb-3 img-fluid"
                  src={require('../../../static/resources/img/garelly-tree.jpg')}
                  alt=""
                />
              </div>
            </div>
          </div>
          <div className="col-md-4 card-2">
            <div className="mb-3 content-card-2">
              <img
                className="img-fluid"
                src={require('../../../static/resources/img/garelly-avatar-2.jpg')}
                alt=""
              />
              <img
                className="img-fluid"
                src={require('../../../static/resources/img/bg-bottom.jpg')}
                alt=""
              />
            </div>
            <img
              className="mb-3 content-card-2 img-fluid"
              src={require('../../../static/resources/img/garelly-avatar-3.jpg')}
              alt=""
            />
          </div>
        </div>
      </section>

      <section className="title-line">
        <div className="line-left straight-line"></div>
        <h2 className="text-center">WHAT OUR PEOPLE SAY</h2>
        <div className="line-right straight-line"></div>
      </section>

      <section
        className="middle-content-3"
        style={{
          backgroundImage:
            'url(' + require('../../../static/resources/img/bg-4.jpg') + ')',
          backgroundPosition: 'center center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div
          className="arrow-left-1 arrow-1"
          onClick={previousAtPeopleReview}
        ></div>
        <Slider
          ref={sliderAtPeopleReviewRef}
          {...doubleItem}
          className="double-item"
        >
          <div>
            <div className="content-item text-white">
              <img
                height="150"
                src={require('../../../static/resources/img/avatar-1.jpg')}
                alt=""
              />
              <span className="text-content">Hello, My name is Julia</span>
            </div>
          </div>
          <div>
            <div className="content-item text-white">
              <img
                height="150"
                src={require('../../../static/resources/img/avatar-2.jpg')}
                alt=""
              />
              <span className="text-content">Hello, My name is Adam</span>
            </div>
          </div>
          <div>
            <div className="content-item text-white">
              <img
                height="150"
                src={require('../../../static/resources/img/avatar-1.jpg')}
                alt=""
              />
              <span className="text-content">Hello, My name is Julia</span>
            </div>
          </div>
          <div>
            <div className="content-item text-white">
              <img
                height="150"
                src={require('../../../static/resources/img/avatar-2.jpg')}
                alt=""
              />
              <span className="text-content">Hello, My name is Adam</span>
            </div>
          </div>
        </Slider>
        <div
          className="arrow-right-1 arrow-1"
          onClick={nextAtPeopleReview}
        ></div>
      </section>
      <section className="container content-bottom">
        <div className="row">
          <div className="col-md-6">
            <div className="text-name">
              <input type="text" placeholder="First name" />
              <input type="text" placeholder="Last name" />
            </div>
            <input type="text" placeholder="User name" />
            <input type="text" placeholder="Email" />
            <input type="text" placeholder="Password" />
            <input type="text" placeholder="Phone number" />
            <div className="mt-3">
              <img
                src={require('../../../static/resources/img/check-circle.svg')}
                alt=""
              />
              <span className="text-white">
                I accept the Terms and Conditions of Xinchao
              </span>
            </div>
            <div>
              <img
                src={require('../../../static/resources/img/check-circle.svg')}
                alt=""
              />
              <span className="text-white">
                I acknowledge that my information will be used in accordance
                with the Privacy Policy and Cookie Policy
              </span>
            </div>
            <div className="text-right">
              <button className="btn-sign-up">Sign up</button>
            </div>
            <div className="mt-3 text-center">
              <h5 className="text-white ">OR SIGN UP WITH</h5>
              <a href="/">
                <img
                  className="img-fluid img-social"
                  width="50"
                  src={require('../../../static/resources/img/facebook.png')}
                  alt=""
                />
              </a>
              <a href="/">
                <img
                  className="img-fluid img-social"
                  width="50"
                  src={require('../../../static/resources/img/google.png')}
                  alt=""
                />
              </a>
            </div>
          </div>
          <div className="col-md-6 content-bottom-right">
            <h2 className="text-center text-white">
              JOIN OUR COMMUNITY
              <br />
              EXPAND YOUR NETWORK
            </h2>
            <h3 className="text-center text-warning">
              Now it's your turn
              <br />
              to write your own
              <br />
              STORY
            </h3>
          </div>
        </div>
      </section>
      <nav className="navbar text-white footer">
        <span>Contact us</span>
        <span>Terms and Conditions</span>
        <span>FAQs</span>
      </nav>
    </div>
  );
};

export default LandingPage;