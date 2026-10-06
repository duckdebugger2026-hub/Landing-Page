const inr = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 })

// 12999 -> "₹12,999"
export function formatINR(amount) {
  return inr.format(Math.round(amount))
}
