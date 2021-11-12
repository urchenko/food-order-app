import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';

import classes from './AvailableMeals.module.css';
import { useEffect, useState } from 'react';

const AvailableMeals = (props) => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(null);
  const [httpError, setHttpError] = useState(null);

  useEffect(() => {
    const fetchMealsHandler = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('https://react-http-cee1e-default-rtdb.firebaseio.com/meals.json');

        if (!response.ok) {
          throw new Error('Something went wrong!');
        }

        const data = await response.json();

        let fetchedMeals = [];

        for (const key in data) {
          fetchedMeals.push({
            id: key,
            name: data[key].name,
            description: data[key].description,
            price: data[key].price,
          });
        }

        setMeals(fetchedMeals);
      } catch (e) {
        setHttpError(e.message);
      }
      setIsLoading(false);
    };

    fetchMealsHandler();
  }, []);

  const mealsList = meals.map((meal) => {
    return (
      <MealItem id={meal.id} key={meal.id} name={meal.name} description={meal.description} price={meal.price}>
        {meal.name}
      </MealItem>
    );
  });

  if (isLoading) {
    return (
      <section className={classes.mealsLoading}>
        <p>Loading...</p>
      </section>
    );
  }

  if (httpError) {
    return (
      <section className={classes.mealsError}>
        <p>{httpError}</p>
      </section>
    );
  }

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
