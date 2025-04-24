import React, { Component } from "react";
import { View, Heading, Text, Button } from "@aws-amplify/ui-react";

class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <View className="p-6 text-center">
          <Heading level={2}>Something Went Wrong</Heading>
          <Text className="my-4">
            An unexpected error occurred. Please try again later.
          </Text>
          <Button variation="primary" onClick={() => window.location.reload()}>
            Refresh Page
          </Button>
        </View>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
