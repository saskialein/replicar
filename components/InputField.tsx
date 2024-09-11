import { InputFieldProps } from '@/types/type'
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View
} from 'react-native'

export default function InputField({
  label,
  labelStyle,
  icon,
  secureTextEntry = false,
  containerStyle,
  inputStyle,
  iconStyle,
  className,
  ...props
}: InputFieldProps) {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className='my-2 w-full'>
          <Text className={`mb-3 font-JakartaSemiBold text-lg ${labelStyle}`}>
            {label}
          </Text>
          <View
            className={`gb-neutral-100 relative flex flex-row items-center justify-start rounded-full border border-neutral-100 focus:border-primary-500 ${containerStyle}`}
          >
            {icon && (
              <Image source={icon} className={`ml-4 h-6 w-6 ${iconStyle}`} />
            )}
            <TextInput
              className={`flex-1 rounded-full p-4 font-JakartaSemiBold text-[15px] ${inputStyle} text-left`}
              secureTextEntry={secureTextEntry}
              {...props}
              placeholderTextColor='gray'
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}
