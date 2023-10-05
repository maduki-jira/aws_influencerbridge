package main

import (
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/dynamodb"
	"github.com/aws/aws-sdk-go/service/dynamodb/dynamodbattribute"
	"fmt"
	"log"
)

// Update Item struct to match your DynamoDB table's schema
type Item struct {
	Name string `dynamodbav:"Name"`
	// Add other attributes as needed
	// Age  int    `dynamodbav:"Age"`
	// ...
}

func addItem() {
	sess := session.Must(session.NewSessionWithOptions(session.Options{
		SharedConfigState: session.SharedConfigEnable,
		Profile:           "Admin_User",
	}))

	svc := dynamodb.New(sess)

	item := Item{
		Name: "JohnDoe",
	}

	av, err := dynamodbattribute.MarshalMap(item)

	if err != nil {
		log.Fatalf("got error marshalling item: %v", err)
	}

	tableName := "Users_DB"

	input := &dynamodb.PutItemInput{
		Item:      av,
		TableName: aws.String(tableName),
	}

	_, err = svc.PutItem(input)
	if err != nil {
		log.Fatalf("got error calling PutItem: %v", err)
	}

	fmt.Println("Successfully added item: Name =", item.Name)
}

func main() {
	addItem()
}

