
export function convertTemperature(value, unit) {
  if (value == null) return null;

  if (unit === "fahrenheit") {
    return (value * 9) / 5 + 32;
  }

  return value;
}

export function convertWindSpeed(value, unit) {
  if (value == null) return null;

  switch (unit) {
    case "ms":
      return value / 3.6;

    case "mph":
      return value / 1.609344;

    case "kmh":
    default:
      return value;
  }
}

export function convertPressure(value, unit) {
  if (value == null) return null;

  switch (unit) {
    case "mmhg":
      return value * 0.750062;

    case "inhg":
      return value * 0.02953;

    case "hpa":
    case "mbar":
    default:
      return value;
  }
}

export function formatValue(value, decimals = 0) {
  if (value == null || !Number.isFinite(value)) {
    return "--";
  }

  return Number(value.toFixed(decimals));
}
