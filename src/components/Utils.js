import { Text } from "react-native";

export function formatDate(inputDateString) {
  const date = new Date(inputDateString);

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(date);

  return formattedDate;
}

export function calculateProfitOrLoss(currentPrice, boughtPrice) {
  const profitOrLoss = currentPrice - boughtPrice;
  const percentageChange = (profitOrLoss / boughtPrice) * 100;

  if (profitOrLoss > 0) {
    return (
      <Text style={{ color: "green" }}>
        {" "}
        {` +${profitOrLoss.toFixed(2)} (${percentageChange.toFixed(2)}%)`}
      </Text>
    );
  } else if (profitOrLoss < 0) {
    return (
      <Text style={{ color: "red" }}>{` ${profitOrLoss.toFixed(
        2
      )} (${percentageChange.toFixed(2)}%)`}</Text>
    );
  } else {
    return <Text style={{ color: "black" }}>0%</Text>;
  }
}
