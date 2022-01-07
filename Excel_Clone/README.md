
# Microsoft Excel Clone
## Overview

- This project is the basic version of Microsoft Excel that is created using HTMI, CSS and JavaScript.
- I tried to create an interface that looks exactly similar to Microsoft Excel.
- The formula Bar that we get in Microsoft Excel is also being simulated in this project with the help of Graph Data Structure.
- One cannot put a cyclic formula and if the user tries to do so then he will be notified via an alert.
- The option to trace the cycle that could get formed is also provided and this is done via a simple animation.




![img](https://i.ibb.co/5Lw9DxC/Screenshot-2022-01-07-at-2-36-51-PM.png)
## Features -

### 1. Multiple Sheets Handling :
- User could create and work upon Multiple Sheets at the same time.
- User could just switch beetween the sheets via a single click.
- User can also delete the sheet by right clicking on it.
![img](https://i.ibb.co/NZ3qjWz/ezgif-6-a145558a50.gif)

### 2. Formula bar :
- User can use the formulas just as in Microsoft Excel.
- The application also supports the dependent formulas i.e we can enter the formula that is using the value of other cell.
- The two way binding is used so that if one cells value is used then all the cells that were dependent on it also changes their value.
- Example - Formula of cell A2 = (A1 + 10 / 3).
![img](https://i.ibb.co/XS1cGmg/ezgif-2-67848cf63d.gif)

### 3. Cyclic formula Detection (Graph Data Structure):
- If the User tries to enter the cyclic formula he will be notified via an alert.
- The option to trace the cycle that could get formed is also provided and this is done via a simple animation.
![img](https://i.ibb.co/w7qh0jP/ezgif-7-708768fce9.gif)

### 4. Open and Save Sheets :
- User can Save the sheet he has worked upon in the json format on his system.
- User is also provided with the Open sheet option which he has saved earlier.
![img](https://i.ibb.co/VTSHSkV/ezgif-2-34ad5edc99.gif)

### 5. Cut, Copy, Paste :
- User can copy and paste the data between the selected range of cells.
- User needs to press the Control/Command button (Windows/Mac) to select the range and just press the paste button.
![img](https://i.ibb.co/4K7WRS6/ezgif-7-499a2cd240.gif)

### 6. Formatting the Cell as per convenience :
- Bold, Italic and underline options are available to format the text.
- User can change the Font family, Font size, Text color and Background color of an individual cell.
- User can change the alignment of the text written within a cell.
![img](https://i.ibb.co/DK1PtYp/ezgif-7-77bc43d48c.gif)


## Tech Stack :

- HTML, CSS
- JavaScript, Node JS