import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { scale } from '../../helpers/function';

interface TicketBlockProps {
  containerStyle?: ViewStyle
  tickets: [];
  renderTicket: (item: any, index: number) => any;
}

const TicketBlock = ({ tickets, renderTicket, containerStyle }: TicketBlockProps) => {
  return <View style={[styles.container, containerStyle]}>{tickets.map(renderTicket)}</View>;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: scale(20),
  },
});

export default TicketBlock;
