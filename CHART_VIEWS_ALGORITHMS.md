# Chart Views Analytics Algorithms

## Overview
The Chart Views section uses sophisticated algorithms to assess student attendance risk, analyze trends, and set personalized goals. Here are the detailed formulas and logic behind each calculation.

---

## 🎯 RISK ASSESSMENT ALGORITHM

### Risk Score Calculation
The system calculates a **Risk Score** between 0 and 1 using multiple weighted factors:

```
Final Risk Score = FACTOR1 + FACTOR2 + FACTOR3 + FACTOR4 + FACTOR5 + FACTOR6
(Clamped between 0 and 1)
```

### Factor Breakdown:

#### **FACTOR 1: Current Attendance Rate**
```
IF attendance_rate = 0%:           +0.6 points
IF attendance_rate < 30%:          +0.5 points  
IF attendance_rate < 50%:          +0.4 points
IF attendance_rate < 70%:          +0.25 points
IF attendance_rate < 80%:          +0.1 points
IF attendance_rate ≥ 80%:          +0.0 points
```

#### **FACTOR 2: Regular (Non-Vacation) Absences**
```
Regular Absence Rate = (Non-Vacation Absences / Total Records) × 100

IF regular_absence_rate > 50%:     +0.4 points
IF regular_absence_rate > 25%:     +0.25 points  
IF regular_absences ≥ 2:           +0.15 points
```

#### **FACTOR 3: Trend Direction**
```
IF trend = "DECLINING" AND regular_absences > 0:  +0.2 points
IF trend = "IMPROVING":                           -0.1 points (reduces risk)
```

#### **FACTOR 4: Recent Absence Pattern**
```
Recent Regular Absences = Count of non-vacation absences in last 5 records

IF recent_regular_absences ≥ 3:   +0.25 points
```

#### **FACTOR 5: Data Quality**
```
IF data_quality = "Limited" AND total_records < 3:  +0.1 points
```

#### **FACTOR 6: Vacation Planning (Risk Reduction)**
```
Vacation Reduction = MIN(0.3, vacation_days × 0.05)
Risk Score = Risk Score - Vacation Reduction
```

### Risk Level Classification:
```
IF risk_score < 0.2:    "LOW RISK"
IF risk_score < 0.5:    "MEDIUM RISK"  
IF risk_score ≥ 0.5:    "HIGH RISK"

Special Override:
IF attendance_rate = 0% AND vacation_absences = 0:  "HIGH RISK" (minimum score 0.8)
```

---

## 📈 TREND ANALYSIS ALGORITHM

### Weekly Rate Calculation:
```
1. Group attendance records by week
2. Calculate weekly attendance rate: (Present Days / Total Days) × 100
3. Apply linear regression to weekly rates
```

### Linear Regression Formula:
```
For n weekly data points:
Slope = (n × ΣXY - ΣX × ΣY) / (n × ΣXX - ΣX × ΣX)

Where:
- X = week number (0, 1, 2, ...)
- Y = weekly attendance rate
- Slope = change in attendance rate per week
```

### Trend Direction Classification:
```
IF |slope| < 2:           "STABLE" ➡️
IF slope > 10:            "STRONGLY IMPROVING" 📈
IF slope > 3:             "IMPROVING" 📈  
IF slope < -10:           "STRONGLY DECLINING" 📉
IF slope < -3:            "DECLINING" 📉
IF -3 ≤ slope ≤ 3:        "SLIGHTLY IMPROVING/DECLINING" 📈/📉
```

### Monthly Projection:
```
Monthly Change = Weekly Slope × 4.33
(4.33 = average weeks per month)
```

### Confidence Level:
```
IF |slope| < 2:                    "High confidence"
IF |slope| ≥ 3:                    "High confidence"  
IF 2 ≤ |slope| < 3:                "Medium confidence"
IF insufficient data (< 2 weeks):  "Low confidence"
```

---

## 🎯 GOAL SETTING ALGORITHM

### Default Target: 80%

### Goal Achievement Logic:
```
IF current_rate ≥ 80%:
    Status = "ACHIEVED ✓"
    New Target = MIN(95%, current_rate + 5%)
    Timeframe = "Maintain current performance"

ELSE:
    Shortfall = 80% - current_rate
    Weekly Improvement = trend_slope
    
    IF weekly_improvement > 0:
        Weeks to Goal = CEIL(shortfall / weekly_improvement)
        
        IF weeks_to_goal ≤ 4:
            Status = "ACHIEVABLE"
            Timeframe = "X week(s)"
            
        IF 5 ≤ weeks_to_goal ≤ 12:
            Status = "LONG TERM"  
            Timeframe = "X weeks"
            
        IF weeks_to_goal > 12:
            Status = "NEEDS SUPPORT"
            Timeframe = "Needs intervention"
    
    ELSE: (stable or declining trend)
        IF current_rate ≥ 70%:
            Status = "NEEDS INTERVENTION"
            Timeframe = "Immediate support required"
        ELSE:
            Status = "HIGH PRIORITY"
            Timeframe = "Urgent intervention needed"
```

---

## 📊 DATA QUALITY ASSESSMENT

### Vacation Detection:
```
Vacation Absence = Record with status "absent" AND 
                  (notes contains "vacation" OR "holiday" OR "leave")

Regular Absence = Record with status "absent" AND 
                 (notes does NOT contain vacation keywords)
```

### Adjusted Attendance Rate:
```
For students with vacation days:
Adjusted Rate = (Present Days / (Total Days - Vacation Days)) × 100
```

### Data Quality Classification:
```
IF total_records < 3:       "Limited data quality"
IF total_records ≥ 3:       "Good data quality"
```

---

## 📋 EXAMPLE CALCULATION

**Student: Abdul Aziz Alzaubi**
- Attendance Rate: 100.0%
- Records: 6 total, all present
- Days Tracked: 35 days

### Risk Assessment:
```
FACTOR 1: 100% rate = +0.0 points
FACTOR 2: 0 regular absences = +0.0 points  
FACTOR 3: Stable trend = +0.0 points
FACTOR 4: 0 recent absences = +0.0 points
FACTOR 5: Good data quality = +0.0 points
FACTOR 6: No vacation reduction = +0.0 points

Final Risk Score = 0.0 → "LOW RISK"
```

### Trend Analysis:
```
All records present → slope ≈ 0
|slope| < 2 → "STABLE ➡️" with "High confidence"
```

### Goal Setting:
```
Current rate (100%) ≥ Target (80%) → "ACHIEVED ✓"
New stretch target = MIN(95%, 100% + 5%) = 95%
Timeframe = "Maintain current performance"
```

### Final Display:
```
Abdul Aziz Alzaubi
LOW RISK
100.0%
Trend: STABLE ➡️ (High confidence)
Goal: 95% target → ACHIEVED ✓ (Maintain current performance)
6 records analyzed • Good data quality • 35 days tracked
Continue monitoring attendance patterns
```

---

## 🔧 Special Cases

### All Absences are Vacation:
```
IF present_records = 0 AND regular_absences = 0 AND vacation_absences > 0:
    Risk Level = "LOW RISK" (score 0.1)
    Special Flag = "Student on vacation - all absences planned"
```

### Zero Attendance (Non-Vacation):
```
IF attendance_rate = 0% AND vacation_absences = 0:
    Risk Level = "HIGH RISK" (minimum score 0.8)
    Override all other calculations
```

### Insufficient Data:
```
IF total_records < 2:
    Trend = "INSUFFICIENT DATA ❓"
    Confidence = "Low"
    Risk gets +0.1 penalty for limited data
```