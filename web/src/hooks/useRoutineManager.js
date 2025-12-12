import { useState } from 'react';

export function useRoutineManager( totalSteps ) {
  const [ openStepId, setOpenStepId ] = useState( 1 );
  const [ completedSteps, setCompletedSteps ] = useState( {} );

  const handleToggle = ( id ) => ( event, isExpanded ) => {
    setOpenStepId( isExpanded ? id : false );
  };

  const handleComplete = ( index ) => {
    setCompletedSteps( prev => ( {
      ...prev,
      [ index ]: !prev[ index ]
    } ) );
    // Auto-close completed step and open next one
    if ( index + 2 <= totalSteps ) {
      setOpenStepId( index + 2 );
    } else {
      setOpenStepId( false );
    }
  };

  const markAllComplete = () => {
    const all = {};
    for ( let i = 0; i < totalSteps; i++ ) {
      all[ i ] = true;
    }
    setCompletedSteps( all );
  };

  const completedCount = Object.values( completedSteps ).filter( Boolean ).length;

  return {
    openStepId,
    completedSteps,
    completedCount,
    handleToggle,
    handleComplete,
    markAllComplete
  };
}
