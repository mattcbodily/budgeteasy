insert into transactions (
    user_id,
    category,
    description,
    amount,
    transaction_date
) values (
    ${userId},
    ${category},
    ${description},
    ${amount},
    ${transactionDate}
);