import pandas as pd

def load_data():
    coa = pd.read_excel("COA_Rate.xlsx")
    fob = pd.read_excel("FOB_Prices.xlsx")
    schedule = pd.read_excel("Shipment_Schedule.xlsx")

    return coa, fob, schedule
