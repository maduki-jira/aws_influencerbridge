package main

import (
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/dynamodb"
	"github.com/aws/aws-sdk-go/service/dynamodb/dynamodbattribute"

	"fmt"
)

// Create struct to hold info about new item
type Item struct {
	number int    `dynamodbav:"number"`
	text   string `dynamodbav:"Text"`
}

func addItem() {
	// Initialize a session that the SDK will use to load
	// credentials from the shared credentials file ~/.aws/credentials
	// and region from the shared configuration file ~/.aws/config.
	sess := session.Must(session.NewSessionWithOptions(session.Options{
		SharedConfigState: session.SharedConfigEnable,
		Profile:           "Admin_User",
	}))

	// Create DynamoDB client
	svc := dynamodb.New(sess)

	item := Item{
		number: 1,
		text:   "hello",
	}

	av, err := dynamodbattribute.MarshalMap(item)

	if err != nil {
		fmt.Errorf("got error marshalling item: %v", err)
	}

	tableName := "test-dev"

	input := &dynamodb.PutItemInput{
		Item:      av,
		TableName: aws.String(tableName),
	}

	_, err = svc.PutItem(input)
	if err != nil {
		fmt.Errorf("got error calling PutItem: %v", err)
	}

	fmt.Println("Successfully added item: Number =", item.number, ", Text =", item.text)

}

func main() {
	addItem()
}
