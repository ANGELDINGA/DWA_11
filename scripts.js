const initialState = { count: 0 };

const actionTypes = {
  ADD: 'ADD',
  SUBTRACT: 'SUBTRACT',
  RESET: 'RESET'
};

function counterReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.ADD:
      return { count: state.count + 1 };
    case actionTypes.SUBTRACT:
      return { count: state.count - 1 };
    case actionTypes.RESET:
      return { count: 0 };
    default:
      return state;
  }
}

function createStore(reducer) {
  let state;
  let listeners = [];

  const getState = () => state;

  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach(listener => listener());
  };

  const subscribe = (listener) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter(l => l !== listener);
    };
  };

  // Initialize the state
  dispatch({ type: '@@INIT' });

  return { getState, dispatch, subscribe };
}

const store = createStore(counterReducer);

store.subscribe(() => {
  console.log('State changed:', store.getState());
});

// Scenario 1: Initial state
console.log('Initial state:', store.getState());

// Scenario 2: Dispatch two "ADD" actions
store.dispatch({ type: actionTypes.ADD });
store.dispatch({ type: actionTypes.ADD });

// Scenario 3: Dispatch "SUBTRACT" action
store.dispatch({ type: actionTypes.SUBTRACT });

// Scenario 4: Dispatch "RESET" action
store.dispatch({ type: actionTypes.RESET });
