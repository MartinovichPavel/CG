# Код-ревью на лабораторную работу №3 у Кочева Ильи
## Архитектура
Программа представляет собой maven проект с логической частью написанной на языке Java и интерфейсом созданным с помощью FXML
## Положительные стороны
* Использование отступов в тексте и адекватных наименований переменных
* Разграничение логики и пользовательского интерфейса
## Замечания
 1. Неправильная реализация пошагового алгоритм:
Пошаговый алгоритм является алгоритмом ЦДА и его реализация идентична данному, с отличием в цвете линии.
~~~java
private void stepByStepLine(GraphicsContext gc, int x1, int y1, int x2, int y2) {
        double dx = x2 - x1;
        double dy = y2 - y1;
        double steps = Math.max(Math.abs(dx), Math.abs(dy));
        double xIncrement = dx / steps;
        double yIncrement = dy / steps;

        double x = x1;
        double y = y1;
        gc.setFill(Color.RED);
        for (int i = 0; i <= steps; i++) {
            gc.fillRect(transformX((int) Math.floor(x)), transformY((int) Math.floor(y)), CELL_SIZE, CELL_SIZE);
            x += xIncrement;
            y += yIncrement;
        }
    }

    private void ddaLine(GraphicsContext gc, int x1, int y1, int x2, int y2) {
        double dx = x2 - x1;
        double dy = y2 - y1;
        int steps = (int) Math.max(Math.abs(dx), Math.abs(dy));
        double xIncrement = dx / steps;
        double yIncrement = dy / steps;

        double x = x1;
        double y = y1;
        gc.setFill(Color.GREEN);
        for (int i = 0; i <= steps; i++) {
            gc.fillRect(transformX((int) Math.floor(x)), transformY((int) Math.floor(y)), CELL_SIZE, CELL_SIZE);
            x += xIncrement;
            y += yIncrement;
        }
    }
~~~
2. Отсутствие комментариев
3. Невозможность ввода отрицательных аргументов в поля
Проблема кроется в том, что невозможно написать "-", ибо это не является числом. 
~~~java
private void setNumericOnlyWithDefaultZero(TextField textField) {
        textField.textProperty().addListener((observable, oldValue, newValue) -> {
            if (newValue.length() > 1 && newValue.startsWith("0")) {
                textField.setText(newValue.substring(1));
            }


            if (!newValue.matches("\\d*")) {
                textField.setText(newValue.replaceAll("[^\\d]", ""));
            }

            if (textField.getText().isEmpty()) {
                textField.setText("0");
            }
        });
    }
~~~
4. Проблемы интерфейса:
- Не возможно определить по надписям, какое поле отвечает за радиус окружности при выборе алгоритма отрисовки окружности.
- При изменении масштаба координатная ось и отрисованная линия могут быть смещены относительно клетчатого поля.
![alt text](https://i.ibb.co/LRVFpsj/image.png)
## Рекомендации по улучшению
1. Добавление комментариев
Пример:
~~~java
//Функция проверки текстового поля
private void setNumericOnlyWithDefaultZero(TextField textField) {  
    textField.textProperty().addListener((observable, oldValue, newValue) -> {  
        //Очистка лидирующих нулей  
  if (newValue.length() > 1 && newValue.startsWith("0")) {  
            textField.setText(newValue.substring(1));  
        }  
        //Проверка на число  
  if (!newValue.matches("\\d*")) {  
            textField.setText(newValue.replaceAll("[^\\d]", ""));  
        }  
        //Замена пустого поля на 0  
  if (textField.getText().isEmpty()) {  
            textField.setText("0");  
        }  
    });  
}
~~~
2. Необходимо исправить пошаговый алгоритм
3. Необходимо исправить сдвиг координатных осей:
Проблема заключается в том, что место где рисуется осевая линия берётся по формуле $CELL SIZE *\left\lfloor \frac{countCells}{2} \right\rfloor$, а в коде она вычисляется по формуле $\left\lfloor CELL SIZE * \frac{countCells}{2} \right\rfloor$.
Прошлое:
~~~java
gc.strokeLine(CELL_SIZE * countCellsWidth / 2, 0, CELL_SIZE * countCellsWidth / 2, canvas.getHeight());  
gc.strokeLine(0, countCellsHeight * CELL_SIZE / 2 + CELL_SIZE, canvas.getWidth(), countCellsHeight * CELL_SIZE / 2 + CELL_SIZE);
~~~
Исправленное:
~~~java
gc.strokeLine(CELL_SIZE * (countCellsWidth / 2), 0, CELL_SIZE * (countCellsWidth / 2), canvas.getHeight());  
gc.strokeLine(0, CELL_SIZE * (countCellsHeight / 2) + CELL_SIZE, canvas.getWidth(), CELL_SIZE * (countCellsHeight / 2) + CELL_SIZE);
~~~
4. Необходимо добавить изменение имени и количества текстовых полей при выборе алгоритма отрисовки окружности.
5. Желательно добавить возможность ввода отрицательных координат, или сместить координатную ось, чтобы она содержала, только положительные координаты. 
## Вывод
Проект сдан в срок со всей необходимой документацией и выполняет поставленные функции, однако существует ряд критических проблем как в логике так и в пользовательском интерфейсе.
CHATGPT: 56%
