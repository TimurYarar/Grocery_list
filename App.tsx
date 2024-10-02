import React from 'react';
import {config} from '@gluestack-ui/config';
import {GluestackUIProvider} from '@gluestack-ui/themed';
import {StyledGestureHandlerRootView} from './components';
import {GroceryScreen} from './screens/GroceryScreen';
import {SafeAreaView} from '@gluestack-ui/themed';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

const queryClient = new QueryClient();

function App(): React.JSX.Element {
  return (
    <GluestackUIProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <StyledGestureHandlerRootView w="$full" minHeight="$full">
          <SafeAreaView $base-bg="$light50" w="$full" h="$full">
            <GroceryScreen />
          </SafeAreaView>
        </StyledGestureHandlerRootView>
      </QueryClientProvider>
    </GluestackUIProvider>
  );
}

export default App;
