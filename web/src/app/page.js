"use client";
// import RadioOptionCard from "./components/onboarding/RadioOptionCard";
import { useState } from 'react';
import CustomRoutine from "../components/custom-routine/CustomRoutine";
import { DUMMY_DATA } from "../data/mockRoutine";

// Helper to parse the unstructured content string
const parseProductContent = ( content ) => {
  // Extract name (everything before "Ingredients:" or just the start)
  const nameMatch = content.split( /Ingredients:|How to use:/ )[ 0 ].trim();
  // Clean up name if it ends with a dot
  const name = nameMatch.endsWith( '.' ) ? nameMatch.slice( 0, -1 ) : nameMatch;

  // Extract brand - simplistic assumption: First word or two, or just use name as brand for now if unknown
  // For better UI, we can try to guess brand or just leave it empty if not structured.
  // Let's use the first word as "Brand" guess if we want, or just put 'Recommended'
  const brand = "Recommended";

  // Extract Tags
  const tagsMatch = content.match( /Tags:\s*(.*?)(?=\.|Hair finish:|$)/ );
  const tags = tagsMatch ? tagsMatch[ 1 ].split( ',' ).map( t => t.trim() ).filter( Boolean ).slice( 0, 3 ) : []; // Limit to 3 tags

  return {
    name,
    brand,
    tags
  };
};

const TRANSFORMED_ROUTINE = {
  profile: "Your Personalized Routine",
  steps: DUMMY_DATA.map( step => ( {
    title: step.step,
    icon: step.step === 'Cleanse' ? '💧' : step.step === 'Condition' ? '🚿' : step.step === 'Treat' ? '✨' : step.step.includes( 'Style' ) ? '🎨' : '🧴',
    description: step.action,
    detailedInstructions: step.notes,
    keyIngredients: step.ingredients,
    recommendedProducts: step.products.map( p => parseProductContent( p.content ) )
  } ) )
};

export default function Home() {
  const [ showRoutine, setShowRoutine ] = useState( false );

  return (
    <div className="min-h-screen bg-[#FDFBF9] font-sans">
      { showRoutine ? (
        <CustomRoutine routine={ TRANSFORMED_ROUTINE } />
      ) : (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
          {/* <RadioOptionCard /> */ }
          <h1 className="text-2xl font-bold mb-4 text-stone-800">Onboarding Flow</h1>
          <p className="mb-8 text-stone-600">Complete the questionnaire to get your routine.</p>
          <button
            onClick={ () => setShowRoutine( true ) }
            className="px-6 py-3 bg-stone-800 text-white rounded-full hover:bg-stone-700 transition-colors"
          >
            Generate My Routine
          </button>
        </div>
      ) }
    </div>
  );
}
