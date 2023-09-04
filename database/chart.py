import matplotlib.pyplot as plt
import numpy as np

# Generate random data following a bell curve distribution
x = [
    28,
    29,
    30,
    31,
    32,
    33,
    34,
    35,
    36,
    37,
    ]

y = [
 2,
 20,
 21,
 43,
 38,
 16,
 12,
 26,
 19,
 1
]

# Create a histogram plot using Matplotlib
plt.bar(x, y)

# Add labels and title
plt.xlabel('Pamokų skaičius')
plt.ylabel('Mokiniai')
# plt.title('Histogram of Data Following a Bell Curve Distribution')

# Show the plot
plt.show()
