import pandas as pd

coa = pd.DataFrame({
    "Route": ["Miami-Houston", "Miami-NY", "Houston-LA", "NY-Chicago"],
    "Cost": [1200, 1500, 1000, 800]
})

fob = pd.DataFrame({
    "Supplier": ["A", "B", "C"],
    "FOB_Price": [500, 650, 450]
})

schedule = pd.DataFrame({
    "Shipment_ID": [1, 2, 3, 4],
    "Route": ["Miami-Houston", "Miami-NY", "Houston-LA", "NY-Chicago"],
    "Demand": [50, 70, 40, 30]
})

coa.to_excel("COA_Rate.xlsx", index=False)
fob.to_excel("FOB_Prices.xlsx", index=False)
schedule.to_excel("Shipment_Schedule.xlsx", index=False)

print("Sample Excel files created successfully.")
