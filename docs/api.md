# API REST Specification

## 1 Schemas

### 1.1 Errors

#### Error : `Object`

| Property  | Type     | Required | Description                                     |
| --------- | -------- | -------- | ----------------------------------------------- |
| `status`  | `Number` | ✔        | One of a server-defined set of error codes.     |
| `message` | `String` | ✔        | A human-readable representation of the error.   |

### 1.2 References

#### ObjectId : `Hexadecimal`

#### Discount : `Object`

| Property      | Type       | Required | Description                               |
| ------------- | ---------- | -------- | ----------------------------------------- |
| `value`       | `Number`   | ✔        | Value to discount with the coupon.        |
| `mark`        | `String`   | ✔        | Either '$' or '%'                         |


#### Coupon : `Object`

| Property      | Type       | Required | Description                               |
| ------------- | ---------- | -------- | ----------------------------------------- |
| `id`          | `ObjectId` | ✔        | An unique identification for the coupon.  |
| `off`         | `Discount` | ✔        | Object with a discount value and its type.|
| `code`        | `String`   |          | The unique code of the coupon.            |
| `description` | `String`   |          | The description of the coupon.            |
| `uses`        | `Number`   |          | Number of times the coupon can be used.   |
| `nbf`         | `Date`     |          | Not Before date.                          |
| `exp`         | `Date`     |          | Expiration date.                          |


####  CodeDefinition : `Object`

| Property      | Type       | Required | Description                                                                   |
| ------------- | ---------- | -------- | ----------------------------------------------------------------------------- |
| `length`      | `Number`   |          | Number of characters in a generated code.                                     |
| `pattern`     | `String`   |          | A pattern for codes where hashes (#) will be replaced with random characters. |
| `prefix`      | `String`   |          | A text appended before the code.                                              |
| `postfix`     | `String`   |          | A text appended after the code.                                               |


#### Valid : `Object`

| Property      | Type       | Required | Description                               |
| ------------- | ---------- | -------- | ----------------------------------------- |
| `value`       | `Boolean`  | ✔        |                                           |

### 1.3 Queries

#### Likeable : `Object`

| Property | Type     | Required | Description                            |
| -------- | -------- | -------- | -------------------------------------- |
| `$regex` | `String` | ✔        | A regular expression pattern to match. |

#### QueryString : `(String | Likeable)`

#### Sortable<T> : `Object`

| Property | Type     | Required | Description                     |
| -------- | -------- | -------- | ------------------------------- |
| `$gt`    | `Number` |          | An upper bound number.          |
| `$gte`   | `Number` |          | An upper bound or equal number. |
| `$lt`    | `Number` |          | A lower bound number.           |
| `$lte`   | `Number` |          | A lower bound or equal number.  |

#### Comparable<T> : (T | Sortable<T>)

#### QueryNumber : Comparable<Number>

#### QueryDate : Comparable<ISODate>

## 2 Supported Methods

Method  | Description                                                                                                                | Is Idempotent
------- | -------------------------------------------------------------------------------------------------------------------------- | -------------
GET     | Return the current value of an object                                                                                      | True
PUT     | Replace an object, or create a named object, when applicable                                                               | True
DELETE  | Delete an object                                                                                                           | True
POST    | Create a new object based on the data provided, or submit a command                                                        | False
HEAD    | Return metadata of an object for a GET response. Resources that support the GET method MAY support the HEAD method as well | True
PATCH   | Apply a partial update to an object                                                                                        | False

## 3 Endpoints

- `/`

  - `GET : Coupon[]`

    Returns all coupons that satisfy the query filter

    **Query Parameters**

    | Property      | Type                      | Required | Description                               |
    | ------------- | ------------------------- | -------- | ----------------------------------------- |
    | `off.value`   | `QueryNumber`             |          | Value to discount with the coupon.        |
    | `off.mark`    | `String`                  |          | The unique code of the coupon.            |
    | `description` | `QueryString`             |          | The description of the coupon.            |
    | `uses`        | `Boolean` | `QueryNumber` |          | Number of times the coupon can be used.   |
    | `nbf`         | `QueryDate`               |          | Not Before date.                          |
    | `exp`         | `QueryDate`               |          | Expiration date.                          |

  - `POST : Coupon`

    **Body**

    | Property      | Type                      | Required | Description                               |
    | ------------- | ------------------------- | -------- | ----------------------------------------- |
    | `off`         | `Discount`                | ✔        | Object with a discount value and its type.|
    | `code`        | `CodeDefinition`          |          | The unique code of the coupon.            |
    | `description` | `String`                  |          | The description of the coupon.            |
    | `uses`        | `Boolean` | `QueryNumber` |          | Number of times the coupon can be used.   |
    | `nbf`         | `ISODate`                 |          | Not Before date.                          |
    | `exp`         | `ISODate`                 |          | Expiration date.                          |

- `/{code}`

  - `GET : Coupon`

  - `PUT : Coupon`

    **Body**

    | Property      | Type                      | Required | Description                               |
    | ------------- | ------------------------- | -------- | ----------------------------------------- |
    | `off`         | `Discount`                | ✔        | Object with a discount value and its type.|
    | `code`        | `CodeDefinition`          |          | The unique code of the coupon.            |
    | `description` | `String`                  |          | The description of the coupon.            |
    | `uses`        | `Boolean` | `QueryNumber` |          | Number of times the coupon can be used.   |
    | `nbf`         | `ISODate`                 |          | Not Before date.                          |
    | `exp`         | `ISODate`                 |          | Expiration date.                          |

  - `PATCH : Coupon`

    **Body**

    | Property      | Type                      | Required | Description                               |
    | ------------- | ------------------------- | -------- | ----------------------------------------- |
    | `off`         | `Discount`                |          | Object with a discount value and its type.|
    | `code`        | `CodeDefinition`          |          | The unique code of the coupon.            |
    | `description` | `String`                  |          | The description of the coupon.            |
    | `uses`        | `Boolean` | `QueryNumber` |          | Number of times the coupon can be used.   |
    | `nbf`         | `ISODate`                 |          | Not Before date.                          |
    | `exp`         | `ISODate`                 |          | Expiration date.                          |

  - `DELETE : Coupon`

- `/{code}/valid`

  - `GET : Valid`
    Returns if a given coupon is valid

- `/{code}/use`

  - `POST : Coupon`
    Uses a given coupon decreasing by one the number of its uses.

