import React, { useState } from 'react';
import people from '../../reviews';
import { FaChevronLeft, FaChevronRight, FaQuoteRight } from 'react-icons/fa';
import Title from "./Title";
import StarRatingComponent from 'react-star-rating-component';


const Review = () => {

  const [index, setIndex] = useState(0);

  const { name, job, image, text, roomStars, restaurantStars, beachStars, serviceStars, attractionsStars } = people[index];

  const checkNumber = (number) => {
    if (number > people.length - 1) {
      return 0;
    }
    if (number < 0) {
      return people.length - 1;
    }
    return number;
  };

  const nextPerson = () => {
    setIndex((index) => {
      let newIndex = index + 1;
      return checkNumber(newIndex);
    });
  };

  const prevPerson = () => {
    setIndex((index) => {
      let newIndex = index - 1;
      return checkNumber(newIndex);
    });
  };

  return (  
    <section className="bgComponent">
      <div className="component">
         <Title title="Our reviews"/>
         <article className='review'>
         <div className="row">
           <div className="column">
            <section className='img-container'>
              <img src={image} alt={name} className='person-img' />
              <span className='quote-icon'>
                <FaQuoteRight />
              </span>    
            </section>
            <h4 className='author'>{name}</h4>
            </div>
            <div class="column" class="rating">
                <div className="categories">
                  <p className="ratingCat">ROOM</p>
                  <p className="ratingCat">RESTAURANT</p>
                  <p className="ratingCat">BEACH</p>
                  <p className="ratingCat">SERVICE</p>
                  <p className="ratingCat">ATTRACTIONS</p>
                </div>

                <div className="categories">
                  <StarRatingComponent name="rate1" editing={false}
                    renderStarIcon={() => <span className="starRating">&#9733;</span>}
                    starCount={10} value={roomStars} />
                  <StarRatingComponent name="rate2" editing={false}
                    renderStarIcon={() => <span  className="starRating">&#9733;</span>}
                    starCount={10} value={restaurantStars} />             
                  <StarRatingComponent name="rate3" editing={false}
                    renderStarIcon={() => <span  className="starRating">&#9733;</span>}
                    starCount={10} value={beachStars} />             
                  <StarRatingComponent name="rate4" editing={false}
                    renderStarIcon={() => <span  className="starRating">&#9733;</span>}
                    starCount={10} value={serviceStars} />
                   <StarRatingComponent name="rate4" editing={false}
                    renderStarIcon={() => <span  className="starRating">&#9733;</span>}
                    starCount={10} value={attractionsStars} />
                </div>
            </div>
          </div> 
            <p className='date'>{job}</p>
            <p className='info'>{text}</p>
         
            <div className='button-container'>
              <button className='prev-btn' onClick={prevPerson}>
                <FaChevronLeft />
              </button>
              <button className='next-btn' onClick={nextPerson}>
                <FaChevronRight />
              </button>
            </div>
          </article>
          </div>
     </section>
    
  );
};

export default Review;

