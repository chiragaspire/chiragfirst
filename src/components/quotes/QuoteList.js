import { Fragment } from 'react';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import QuoteItem from './QuoteItem';
import classes from './QuoteList.module.css';
const shortQuotes = (quotes, accending) => {
  return quotes.sort((quoteA, quoteB) => {
    if (accending) {
      return quoteA.id > quoteB.id ? 1 : -1;
    }
    else {
      return quoteA.id < quoteB.id ? 1 : -1;
    }
  })
}

const QuoteList = (props) => {
  const history = useHistory();
  const location = useLocation();
  
  
  const queryParams = new URLSearchParams(location.search);
  const isSortAccending = queryParams.get('sort') === 'asc';
  
  const changeSortingHandler = () => {
    history.push({
      pathname: location.pathname,
      search:`?sort=${(isSortAccending?'dec':'asc') }`
    });
    // history.push(`${location.pathname}/?sort=${(isSortAccending?'dec':'asc') }`);
  }
  const shortedQuotes = shortQuotes(props.quotes, isSortAccending);
  return (
    <Fragment>
      <div className={classes.sorting}>
        <button onClick={changeSortingHandler}>Sort {isSortAccending?'Deccending':'Accending'}</button>
      </div>
      <ul className={classes.list}>
        {shortedQuotes.map((quote) => (
          <QuoteItem
            key={quote.id}
            id={quote.id}
            author={quote.author}
            text={quote.text}
          />
        ))}
      </ul>
    </Fragment>
  );
};

export default QuoteList;
