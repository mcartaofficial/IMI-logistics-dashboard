from pulp import LpMinimize, LpProblem, LpVariable, lpSum

def optimize_shipping(coa, schedule):

    routes = coa["Route"].tolist()
    costs = dict(zip(coa["Route"], coa["Cost"]))
    demand = dict(zip(schedule["Route"], schedule["Demand"]))

    model = LpProblem("Minimize_Shipping_Cost", LpMinimize)

    decision_vars = LpVariable.dicts(
        "Shipments",
        routes,
        lowBound=0,
        cat="Integer"
    )

    # Objective function
    model += lpSum(decision_vars[r] * costs[r] for r in routes)

    # Demand constraints
    for r in routes:
        if r in demand:
            model += decision_vars[r] >= demand[r]

    model.solve()

    results = {
        r: int(decision_vars[r].varValue)
        for r in routes
    }

    total_cost = sum(results[r] * costs[r] for r in routes)

    return results, total_cost
