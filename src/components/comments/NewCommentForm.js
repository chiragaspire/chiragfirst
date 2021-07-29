import { useEffect, useRef } from 'react';
import classes from './NewCommentForm.module.css';
import useHttp from '../../hooks/use-http';
import { addComment } from '../../lib/api';
import LoadingSpinner from '../UI/LoadingSpinner';
import { useHistory, useRouteMatch } from 'react-router-dom';
const NewCommentForm = (props) => {
  const history = useHistory();
  const match = useRouteMatch();
  const commentTextRef = useRef();

  const { onAddedComment, quoteId } = props;
  
  const { sendRequest, status, error } = useHttp(
    addComment
  );
  useEffect(() => {
    if (status === 'completed' && !error) {
      commentTextRef.current.value = '';
      onAddedComment();
      
    }
    
  }, [status, error, onAddedComment]);
 

  const submitFormHandler = (event) => {
    event.preventDefault();
    const enteredText = commentTextRef.current.value;
    // optional: Could validate here

    // send comment to server
    sendRequest({
      commentData: { text: enteredText } ,
      quoteId :  quoteId 
    });
    
  };

  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
     { status === 'pending' && (
        <div className='centered'>
          <LoadingSpinner />
        </div >)
  }

      <div className={classes.control} onSubmit={submitFormHandler}>
        <label htmlFor='comment'>Your Comment</label>
        <textarea required id='comment' rows='5' ref={commentTextRef}></textarea>
      </div>
      <div className={classes.actions}>
        <button className='btn'>Add Comment</button>
      </div>
    </form>
  );
};

export default NewCommentForm;
