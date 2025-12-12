import RadioOptionCard from "./RadioOptionCard";

export default function SingleRadioOnboarding(options) {
  console.log(options);
  return (
    <Box>
      {options.map((option) => (
        <Box>
          <RadioOptionCard key={question.id} option={option} />
        </Box>
      ))}
    </Box>
  );
}
