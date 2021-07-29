import { Fragment, useEffect } from 'react';
import { useParams, Route, Link, useRouteMatch } from 'react-router-dom';

import HighlightedQuote from '../components/quotes/HighlightedQuote';
import Comments from '../components/comments/Comments';

import useHttp from '../hooks/use-http';
import { getSingleQuote } from '../lib/api';
import LoadingSpinner from '../components/UI/LoadingSpinner';

const QuoteDetail = () => {
  const params = useParams();
  const match = useRouteMatch();
  const { quoteId } = params;
  const { sendRequest, status, data: loadedQuotes, error } = useHttp(
    getSingleQuote,
    true
  );
  useEffect(() => {
    sendRequest(quoteId)
  }, [sendRequest, quoteId]);
  if (status === 'pending') {
    return (
      <div className='centered'>
        <LoadingSpinner />
      </div >
    );
  }
  if (error) {
    return <p className='centered focused' >{error}</p>
  }
  if (!loadedQuotes.text) {
    return <p>No quote found!</p>;
  }
  console.log(match);
  return (
    <Fragment>
      <HighlightedQuote text={loadedQuotes.text} author={loadedQuotes.author} />
      <Route path={`${match.path}`} exact>
        <div className='centered'>
          <Link className='btn--flat' to={`${match.url}/comments`} >
            Load Comments
          </Link>
        </div>
      </Route>
      <Route path={`${match.path}/comments`}>
        <Comments />
      </Route>
    </Fragment>
  );
};

export default QuoteDetail;
